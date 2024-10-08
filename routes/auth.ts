import signIn from './auth/signIn';
import signUp from './auth/signUp';
import google from './auth/google';
import { resetPassword } from './auth/passwordReset';


import express from 'express';
import { requestOTP, verifyOTP } from './auth/otp';
const router = express.Router();


router.put("/sign_in", express.json(), signIn);
router.post("/sign_up", express.json(), signUp);
router.post("/google", express.json(), google);
router.post("/new_otp", express.json(), requestOTP);
router.post("/verify_otp", express.json(), verifyOTP);
router.post("/reset_password", express.json(), resetPassword);
router.get('/', function (req, res) {
        res.send("auth");
});

export default router;
