import express from 'express';
const router = express.Router();

import {createProfile, getProfile, getProfilePhoto, setProfilePhoto} from './users/profile';
import auth from '../middlewares/auth';

router.post("/", [auth, express.json()], createProfile)
router.get("/", [auth, express.json()], getProfile)
router.post("/photo", [auth, express.json()], setProfilePhoto)
router.get("/photo", [auth, express.json()], getProfilePhoto)

export default router;
