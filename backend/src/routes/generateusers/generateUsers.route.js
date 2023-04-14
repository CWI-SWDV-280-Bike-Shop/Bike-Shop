import express from 'express';
import GenerateUsersController from '../../controllers/generateUsers.controller.js';

const router = express.Router();

router.get('/', GenerateUsersController.getResults);

router.get('/:quantity', GenerateUsersController.getResults);

export default router;
