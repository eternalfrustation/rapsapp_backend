import express from 'express';
const router = express.Router();
import auth from "../middlewares/auth";
import getUserInfo from "./users/info";

/* GET users listing. */
router.get('/', auth, getUserInfo);

export default router;
