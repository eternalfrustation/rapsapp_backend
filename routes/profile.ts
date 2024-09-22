import express from 'express';
const router = express.Router();

import {createProfile, getProfile} from './users/profile';
import auth from '../middlewares/auth';

router.post("/", [auth, express.json()], createProfile)
router.get("/", [auth, express.json()], getProfile)

export default router;
