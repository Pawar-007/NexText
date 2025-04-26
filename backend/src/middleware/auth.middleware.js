import { asyncHandler } from "../utils/async-handler.js";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try { 
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user - works for both regular and guest users
      req.user = await User.findById(decode.id).select("-password");
      
      // Optional: Check if guest account is expired
      if (req.user?.isGuest && req.user?.guestExpiresAt < new Date()) {
        res.status(401);
        throw new Error("Guest session expired");
      }

      next();
    } catch (error) {
      res.status(401).json({"message":"Not authorized, token failed"});
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json({"message":"Not authorized, no token"});
    throw new Error("Not authorized, no token");
  }
});

export {protect};