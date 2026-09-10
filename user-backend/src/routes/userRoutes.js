import express from 'express';
import { syncGoogleUser, updateUserProfile } from '../controllers/userAuthController.js';

const router = express.Router();

router.post('/sync-google-user', syncGoogleUser);
router.post('/update-profile', updateUserProfile);

export default router;
