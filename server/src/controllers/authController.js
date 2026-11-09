import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/emailService.js";
import crypto from "crypto";
export const registerUser = async (req, res) => {
    try {
        // Get user data
        const { name, email, phone, password, acceptedTerms } = req.body;

        // validate required fields
        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required.",
            });
        }
        // Validate terms and conditions
        if (acceptedTerms !== true) {
            return res.status(400).json({
                success: false,
                message: "Please accept the terms and conditions.",
            });
        }


        // validate password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        // normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // checking existing user
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate a secure verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Hash the token before storing it in MongoDB
        const verificationTokenHash = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

        // Set token expiry to 24 hours
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Create the user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            verificationTokenHash,
            verificationTokenExpires,
            verificationEmailSentAt: new Date(),
        });

        // Create verification link
        const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

        // Send verification email
        await sendEmail({
            to: email,
            subject: "Verify Your UrbanWear Account",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Welcome to UrbanWear!</h2>
      <p>Thank you for creating an account.</p>
      <p>Please verify your email address by clicking the button below:</p>

      <a
        href="${verificationUrl}"
        style="display: inline-block; padding: 12px 24px; background: #F5B544; color: #111; text-decoration: none; border-radius: 5px; font-weight: bold;"
      >
        Verify Email
      </a>

      <p>This link expires in 24 hours.</p>
      <p>If you did not create this account, you can ignore this email.</p>
    </div>
  `,
        });

        // send response
        return res.status(201).json({
            success: true,
            message: "Registration successful. Please verify your email.",
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
        console.error("Registration error", error);
        // handle duplicate email race condition
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

export const verifyEmail = async (req, res) => {
    try {
        const { token, email } = req.body;

        // Validate input
        if (!token || !email) {
            return res.status(400).json({
                success: false,
                message: "Verification token and email are required.",
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Hash the received token
        const verificationTokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with matching token
        const user = await User.findOne({
            email: normalizedEmail,
            verificationTokenHash,
            verificationTokenExpires: { $gt: new Date() },
        }).select("+verificationTokenHash +verificationTokenExpires");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification link.",
            });
        }

        // Mark email as verified
        user.isVerified = true;

        // Remove verification token after successful verification
        user.verificationTokenHash = null;
        user.verificationTokenExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now log in.",
        });

    } catch (error) {
        console.error("Email verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error during email verification.",
        });
    }
};

export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const user = await User.findOne({
            email: normalizedEmail,
        }).select("+verificationEmailSentAt");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email.",
            });
        }

        // Check whether email is already verified
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Your email is already verified. Please log in.",
            });
        }

        // Check 60-second cooldown
        if (user.verificationEmailSentAt) {
            const elapsedTime =
                Date.now() - user.verificationEmailSentAt.getTime();

            const remainingTime = Math.ceil(
                (60000 - elapsedTime) / 1000
            );

            if (remainingTime > 0) {
                return res.status(429).json({
                    success: false,
                    message: `Please wait ${remainingTime} seconds before requesting another verification email.`,
                    retryAfter: remainingTime,
                });
            }
        }

        // Generate a new verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Hash token
        const verificationTokenHash = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

        // Set expiry to 24 hours
        const verificationTokenExpires = new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );

        // Update user
        user.verificationTokenHash = verificationTokenHash;
        user.verificationTokenExpires = verificationTokenExpires;
        user.verificationEmailSentAt = new Date();

        await user.save();

        // Generate verification URL
        const verificationUrl =
            `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(user.email)}`;

        // Send verification email
        await sendEmail({
            to: user.email,
            subject: "Verify Your UrbanWear Account",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                    <h2>Verify Your UrbanWear Account</h2>
                    <p>Here is your new email verification link.</p>

                    <a
                        href="${verificationUrl}"
                        style="display: inline-block; padding: 12px 24px; background: #F5B544; color: #111; text-decoration: none; border-radius: 5px; font-weight: bold;"
                    >
                        Verify Email
                    </a>

                    <p>This link expires in 24 hours.</p>
                    <p>If you did not request this email, you can ignore it.</p>
                </div>
            `,
        });

        return res.status(200).json({
            success: true,
            message: "A new verification email has been sent successfully.",
        });

    } catch (error) {
        console.error("Resend verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send verification email. Please try again later.",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        // get login credentials
        const { email, password } = req.body;

        // validate required fields
        if (!email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // normalize email
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

        // check account status
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive",
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

        // compare password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );

        // update last login
        user.lastLogin = new Date();
        await user.save();

        // set the HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        //send response
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
        console.error("Login erro:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during login.",
        });
    }
}

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

export const testEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        await sendEmail({
            to: email,
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
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};