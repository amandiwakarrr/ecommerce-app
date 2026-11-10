import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login first.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or account is inactive.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

// Optional authentication middleware
export const optionalProtect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // No token means the user is not logged in.
    if (!token) {
      req.user = null;
      return next();
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    // Invalid, deleted or inactive user
    if (!user || !user.isActive) {
      req.user = null;
      return next();
    }

    // Valid authenticated user
    req.user = user;
    next();

  } catch (error) {
    // Invalid or expired token
    if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      req.user = null;
      return next();
    }

    // Unexpected server/database error
    next(error);
  }
};
