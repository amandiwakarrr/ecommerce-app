import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/emailService.js";
import crypto from "crypto";

// Generate a secure 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// Hash OTP using SHA-256
const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

// Common OTP email template
const getOTPEmailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Welcome to UrbanWear!</h2>
      <p>Thank you for creating an account.</p>
      <p>Your email verification code is:</p>

      <h1 style="letter-spacing: 8px; color: #F5B544;">
        ${otp}
      </h1>

      <p>This OTP expires in 5 minutes.</p>
      <p>If you did not request this code, you can ignore this email.</p>
    </div>
  `;
};

// REGISTER USER


export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, acceptedTerms } = req.body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // Validate terms
    if (acceptedTerms !== true) {
      return res.status(400).json({
        success: false,
        message: "Please accept the terms and conditions.",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = generateOTP();
    const otpHash = hashOTP(otp);

    const now = new Date();

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      otpHash,
      otpExpiresAt: new Date(now.getTime() + 5 * 60 * 1000),
      otpAttempts: 0,
      otpSentAt: now,
    });

    // Send OTP email
    try {
      await sendEmail({
        to: normalizedEmail,
        subject: "Your UrbanWear Verification Code",
        html: getOTPEmailTemplate(otp),
      });
    } catch (emailError) {
      console.error("Registration OTP email failed:", emailError);

      // Keep account recoverable and allow immediate resend
      await User.updateOne(
        { _id: user._id, otpHash },
        {
          $set: {
            otpHash: null,
            otpExpiresAt: null,
            otpAttempts: 0,
            otpSentAt: null,
          },
        },
      );

      return res.status(502).json({
        success: false,
        accountCreated: true,
        requiresVerification: true,
        message:
          "Account created, but verification email could not be sent. Please request a new OTP.",
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email using the OTP sent to your inbox.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
};

// VERIFY EMAIL OTP

export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email?.trim() || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    if (typeof otp !== "string" || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit OTP.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Retrieve OTP fields
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+otpHash +otpExpiresAt +otpAttempts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified. Please log in.",
      });
    }

    // Check maximum attempts
    if (user.otpAttempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new OTP.",
      });
    }

    // Check whether an OTP exists
    if (!user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "No active OTP found. Please request a new OTP.",
      });
    }

    // Check OTP expiry
    const now = new Date();

    if (user.otpExpiresAt.getTime() <= now.getTime()) {
      await User.updateOne(
        {
          _id: user._id,
          otpHash: user.otpHash,
        },
        {
          $set: {
            otpHash: null,
            otpExpiresAt: null,
            otpAttempts: 0,
          },
        },
      );

      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // Hash received OTP
    const receivedOtpHash = hashOTP(otp);

    // Compare hashes safely
    const receivedBuffer = Buffer.from(receivedOtpHash, "hex");
    const storedBuffer = Buffer.from(user.otpHash, "hex");

    const isOtpValid =
      receivedBuffer.length === storedBuffer.length &&
      crypto.timingSafeEqual(receivedBuffer, storedBuffer);

    // Common conditions for atomic updates
    const otpConditions = {
      _id: user._id,
      isVerified: false,
      otpHash: user.otpHash,
      otpExpiresAt: { $gt: now },
      $or: [
        { otpAttempts: { $lt: 5 } },
        { otpAttempts: { $exists: false } },
      ],
    };

    // Handle incorrect OTP
    if (!isOtpValid) {
      const updatedUser = await User.findOneAndUpdate(
        otpConditions,
        {
          $inc: { otpAttempts: 1 },
        },
        { new: true },
      ).select("+otpAttempts");

      if (!updatedUser) {
        return res.status(429).json({
          success: false,
          message:
            "OTP is no longer valid. Please request a new OTP.",
        });
      }

      if (updatedUser.otpAttempts >= 5) {
        await User.updateOne(
          {
            _id: updatedUser._id,
            otpAttempts: { $gte: 5 },
          },
          {
            $set: {
              otpHash: null,
              otpExpiresAt: null,
            },
          },
        );

        return res.status(429).json({
          success: false,
          message: "Too many incorrect attempts. Please request a new OTP.",
        });
      }

      return res.status(400).json({
        success: false,
        message: `Incorrect OTP. ${5 - updatedUser.otpAttempts} attempts remaining.`,
      });
    }

    // Verify OTP atomically
    const result = await User.updateOne(
      otpConditions,
      {
        $set: {
          isVerified: true,
          otpHash: null,
          otpExpiresAt: null,
          otpAttempts: 0,
          otpSentAt: null,
        },
      },
    );

    if (result.modifiedCount !== 1) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or has expired. Please request a new OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during OTP verification.",
    });
  }
};

// RESEND VERIFICATION OTP

export const resendVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+otpSentAt");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified. Please log in.",
      });
    }

    const now = new Date();
    const cooldownCutoff = new Date(now.getTime() - 60000);

    // Generate new OTP
    const otp = generateOTP();
    const otpHash = hashOTP(otp);

    // Atomically reserve the resend cooldown
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        isVerified: false,
        $or: [
          { otpSentAt: null },
          { otpSentAt: { $exists: false } },
          { otpSentAt: { $lte: cooldownCutoff } },
        ],
      },
      {
        $set: {
          otpHash,
          otpExpiresAt: new Date(now.getTime() + 5 * 60 * 1000),
          otpAttempts: 0,
          otpSentAt: now,
        },
      },
      { new: true },
    );

    // Another request may have reserved the cooldown
    if (!updatedUser) {
      const latestUser = await User.findById(user._id)
        .select("+otpSentAt");

      if (latestUser?.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Email is already verified. Please log in.",
        });
      }

      if (latestUser?.otpSentAt) {
        const remainingTime = Math.ceil(
          (60000 - (Date.now() - latestUser.otpSentAt.getTime())) / 1000,
        );

        if (remainingTime > 0) {
          return res.status(429).json({
            success: false,
            message: `Please wait ${remainingTime} seconds before requesting another OTP.`,
            retryAfter: remainingTime,
          });
        }
      }

      return res.status(409).json({
        success: false,
        message: "Unable to generate OTP. Please try again.",
      });
    }

    // Send OTP email
    try {
      await sendEmail({
        to: normalizedEmail,
        subject: "Your New UrbanWear Verification Code",
        html: getOTPEmailTemplate(otp),
      });
    } catch (emailError) {
      console.error("Resend OTP email failed:", emailError);

      // Clear only this request's OTP and release cooldown
      await User.updateOne(
        {
          _id: updatedUser._id,
          otpHash,
        },
        {
          $set: {
            otpHash: null,
            otpExpiresAt: null,
            otpAttempts: 0,
            otpSentAt: null,
          },
        },
      );

      return res.status(502).json({
        success: false,
        message:
          "Unable to send OTP email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "A new verification OTP has been sent to your email.",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send OTP. Please try again later.",
    });
  }
};

// LOGIN USER

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user and retrieve password
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check account status
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    // Verify password before revealing account verification status
    const isValidPassword = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
        requiresVerification: true,
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      },
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};

// LOGOUT USER

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during logout.",
    });
  }
};

// TEST EMAIL

export const testEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    await sendEmail({
      to: email.trim(),
      subject: "UrbanWear Email Test",
      html: `
        <h2>Welcome to UrbanWear!</h2>
        <p>Your Gmail SMTP configuration is working successfully.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    console.error("Test email error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send test email.",
    });
  }
};
