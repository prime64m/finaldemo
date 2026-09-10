import express from 'express';
import { getSchemes, createScheme, updateScheme, deleteScheme } from '../controllers/schemeAdminController.js';

const router = express.Router();

router.route('/')
  .get(getSchemes)
  .post(createScheme);

router.route('/:id')
  .put(updateScheme)
  .delete(deleteScheme);

export default router;
