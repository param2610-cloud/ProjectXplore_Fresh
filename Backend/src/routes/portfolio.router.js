import express from 'express';
import { updatePortfolio } from '../controllers/portfolio.controller.js';

const router = express.Router();

router.post('/portfolio', updatePortfolio);

export default router;