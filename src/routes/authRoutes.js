import express from "express";
import {register,login,forgotPass,checkUserName} from "../controllers/authController.js"


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotPass', forgotPass);
router.get("/check-username/:username", checkUserName);

export default router