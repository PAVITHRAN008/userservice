
import * as authService from "../services/authService.js";
import { StatusCode, ResponseMessage, sendResponse } from '../utils/responseUtils.js';


export const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);
        if (!result.success) {
            return sendResponse(res, result.statusCode, result.message, result, result.error)
        }
        return sendResponse(res, result.statusCode, result.message,result)
    } catch (err) {
        return sendResponse(res, StatusCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST, null, process.env.NODE_ENV === 'development' ? err.message : null);
    }
}

export const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
       if (!result.success) {
            return sendResponse(res, result.statusCode, result.message, result, result.error)
        }
        return sendResponse(res, result.statusCode, result.message,result)
    } catch (err) {
        return sendResponse(res, StatusCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST, null, process.env.NODE_ENV === 'development' ? err.message : null);
    }

};

export const forgotPass = async (req, res) => {
    try {
        const result = await authService.forgotPass(req.body);
        if (!result.success) {
              return sendResponse(res, result.statusCode, result.message,result,result.error);
        }
       return sendResponse(res, result.statusCode, result.message,result)
    } catch(err) {
        return sendResponse(res, StatusCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST, null, process.env.NODE_ENV === 'development' ? err.message : null);
    }
}


export const checkUserName = async (req, res) => {
    try {
        const result = await authService.checkUserName(req.params);
        if (!result.success) {
             return sendResponse(res,result.statusCode, result.message, result, result.error)
        }
       return sendResponse(res,result.statusCode, result.message,result)
    } catch (err) {
         return sendResponse(res, StatusCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST, null, process.env.NODE_ENV === 'development' ? err.message : null);
    }
};
