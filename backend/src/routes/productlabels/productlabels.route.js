import express from 'express';
import ProductLabelsController from './productlabels.controller.js';

const router = express.Router();

router.get('/', ProductLabelsController.getLabels);

export default router;