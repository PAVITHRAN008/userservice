import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import decryptedPassword from '../utils/utilService.js';
import { StatusCode, ResponseMessage } from '../utils/responseUtils.js';
import dotenv from "dotenv";

dotenv.config();
export const registerUser = async (data) => {
    try {
        let { userName, password, userRole } = data;
        let userExists = await User.findOne({ userName });
        if (userExists) {
            return { success: false, statusCode: StatusCode.CONFLICT, message: ResponseMessage.USER_EXISTS };
        }
        let decryptedPass = await decryptedPassword(password);
        const user = await User.create({ userName, password: decryptedPass, userRole });
        if (user) {
            return { success: true, statusCode: StatusCode.SUCCESS, message: ResponseMessage.USER_CREATED };
        }
        else {
            return {
                success: false, statusCode: StatusCode.BAD_REQUEST, message: 'Invalid user data'
            };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: 'Registration failed',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        };
    }
};


export const login = async (data) => {
    try {
        const { userName, password, userRole } = data;
        const user = await User.findOne({ userName });
        if (!user) {
            return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.INVALI_USER_NAME };
        }
        const plainPassword = await decryptedPassword(password);
        const isMatch = await user.matchPassword(plainPassword);
        if (!isMatch) {
            return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.INVALI_USER_PASS };
        }
        if (userRole != user.userRole) {
            return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.INVALI_USER_ROLE };
        }
        else {
            const token = generateToken(user._id);
            return { success: true, statusCode: StatusCode.SUCCESS, message: ResponseMessage.LOGIN_SUCCESS,user,token };
        }
    } catch (error) {
        return {
            success: false,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: 'Registration failed',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        };
    }

}

export const forgotPass = async (data) => {
    try {
        const { password, userName } = data;
        let decryptedPass = await decryptedPassword(password);
        const user = await User.findOne({ userName });
        if (user) {
            user.password = decryptedPass;
            user.updatedAt = Date.now();
            await user.save();
            return { success: true, statusCode: StatusCode.SUCCESS, message: ResponseMessage.CHANGE_PASS };
        }
        return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.INVALID_USER };
    } catch (error) {
        return {
            success: false,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: 'Registration failed',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        };
    }

}

export const checkUserName = async (data) => {
    try {
        const { username } = data;
        if (!username || username.trim() === "") {
            return { success: false, statusCode: StatusCode.BAD_REQUEST, message: ResponseMessage.USER_NAME_REQ };
        }
        const user = await User.findOne({ userName: username });
        if (user) {
            return { success: true, statusCode: StatusCode.SUCCESS, message: ResponseMessage.USER_NAME_AVL,userRole: user.userRole };
        }
        return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.INVALID_USER };
    } catch (error) {
        return {
            success: false,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: 'Registration failed',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        };
    }
}