import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from "dotenv";
import { StatusCode, ResponseMessage, sendResponse } from '../utils/responseUtils.js';

dotenv.config();

export const protect = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                //return res.status(401).json({ message: 'Token expired. Please refresh your token.' });
                 return sendResponse(res,StatusCode.UNAUTHORIZED,ResponseMessage.TOKEN_EXPIRED);
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token. Please log in again.' });
            } else {
                return res.status(500).json({ message: 'Authentication failed.' });
            }
        }
    }
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });
}