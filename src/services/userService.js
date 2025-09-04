import User from '../models/userModel.js';
import decryptedPassword from '../utils/utilService.js';
import { StatusCode, ResponseMessage } from '../utils/responseUtils.js';
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (data) => {
  try {
    let { userName, password, userRole, creatorUsername } = data;
    let userExists = await User.findOne({ userName });
    if (userExists) {
      return { success: false, statusCode: StatusCode.CONFLICT, message: ResponseMessage.USER_EXISTS };
    }
    let decryptedPass = await decryptedPassword(password);

    const user = await User.create({ userName, password: decryptedPass, userRole, modifiedBy: creatorUsername });
    if (user) {
      await user.save();
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

export const getUsers = async () => {
  return await User.find();
}
export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.INVALID_USER };
  }
  return await User.findById(id);
}
export const updateUser = async (id, data) => {
  const { modifierId, ...updateData } = data;
  const user = await User.findByIdAndUpdate(id, { ...updateData, modifiedBy: modifierId, updatedAt: Date.now() }, { new: true });
  if (!user) {
    return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.USER_NOT_FOUND };
  }
  return { success: true, statusCode: StatusCode.SUCCESS, message: ResponseMessage.USER_UPDATED };
}
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.USER_NOT_FOUND };
  }
  return { success: true, statusCode: StatusCode.SUCCESS, message: ResponseMessage.USER_DELETED};
}
export const changePass = async (id, data) => {
  const { password } = data;
  let decryptedPass = await decryptedPassword(password);
  const user = await User.findById(id);
  if (user) {
    user.password = decryptedPass;
    user.updatedAt = Date.now();
    await user.save();
    return { success: true, statusCode: StatusCode.SUCCESS, message: ResponseMessage.CHANGE_PASS };
  }
  else {
    return { success: false, statusCode: StatusCode.SUCCESS, message: ResponseMessage.USER_NOT_FOUND };
  }
} 
