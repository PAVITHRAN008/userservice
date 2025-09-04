import * as userService from '../services/userService.js';
import { StatusCode, ResponseMessage, sendResponse } from '../utils/responseUtils.js';



export const createUser = async (req, res) => {
    try {
        const result = await userService.createUser(req.body);
        if (!result.success) {
             return sendResponse(res,result.statusCode, result.message,null, result.error)
        }
       return sendResponse(res,result.statusCode, result.message,result)
    } catch (err) {
        return sendResponse(res, StatusCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST, null, process.env.NODE_ENV === 'development' ? err.message : null);
    }
}

export const getUsers = async (req, res) => {
  try {
      const users = await userService.getUsers();
      return sendResponse(res, StatusCode.SUCCESS, ResponseMessage.RETRIEVED,users);
  } catch (err) {
     return sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_ERROR, null, process.env.NODE_ENV === 'development' ? error.message : null);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
     return sendResponse(res, StatusCode.SUCCESS, ResponseMessage.RETRIEVED);
  } catch (err) {
   return sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_ERROR, null, process.env.NODE_ENV === 'development' ? error.message : null);
  }
};


export const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    if (!result.success) {
             return sendResponse(res,result.statusCode, result.message, result, result.error)
        }
    return sendResponse(res, result.statusCode, result.message,result);
  } catch (err) {
    return sendResponse(res, StatusCode.BAD_REQUEST, ResponseMessage.BAD_REQUEST, null, process.env.NODE_ENV === 'development' ? error.message : null);
  }
};


export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
     if (!result.success) {
       return sendResponse(res,result.statusCode, result.message, result, result.error)
     }
    return sendResponse(res,result.statusCode, result.message, result);;
  } catch (err) {
    return sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_ERROR, null, process.env.NODE_ENV === 'development' ? err.message : null);
  }
};

export const changePass =async(req,res)=>{
  try {
    const result = await userService.changePass(req.params.id,req.body);
     if (!result.success) {
             return sendResponse(res,result.statusCode, result.message, result, result.error)
        }
    return sendResponse(res, result.statusCode, result.message,result);
  } catch (err) {
    return sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_ERROR, null, process.env.NODE_ENV === 'development' ? err.message : null);
  }
}

