import express from 'express';
import { getArtisans } from '../controllers/artisanController.js';

const router = express.Router();

router.get('/', getArtisans);

export default router;