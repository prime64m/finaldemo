import express from 'express';
import { getPublishedSchemes, checkEligibility } from '../controllers/schemeUserController.js';

const router = express.Router();

router.get('/', getPublishedSchemes);
router.post('/check-eligibility', checkEligibility);

export default router;
