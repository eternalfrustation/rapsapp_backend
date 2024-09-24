import express from 'express';
const router = express.Router();

import { addService, createProfile, getProfile, getProfilePhoto, getServices, setProfilePhoto } from './users/profile';
import auth from '../middlewares/auth';

router.post("/", [auth, express.json()], createProfile)
router.get("/", [auth, express.json()], getProfile)
router.post("/photo", auth, setProfilePhoto)
router.get("/photo", auth, getProfilePhoto)
router.get("/services", [auth, express.json()], getServices)
router.post("/services", [auth, express.json()], addService)

export default router;
