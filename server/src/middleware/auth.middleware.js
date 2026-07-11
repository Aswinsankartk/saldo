import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const [, token] = authHeader.split(" ");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
