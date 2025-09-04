import express from "express";
import {createUser,getUsers, getUserById, updateUser, deleteUser,changePass } from "../controllers/userController.js";
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post("/createUser",protect,createUser)

router.get("/",protect,getUsers);
// router.get("/:id",protect,getUserById);
router.get("/deleteUser/:id",protect,deleteUser);

router.put("/:id",updateUser);
router.put("/changePass/:id",protect,changePass);



export default router;


