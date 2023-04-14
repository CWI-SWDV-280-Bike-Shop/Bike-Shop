import express from 'express';
import GenerateUsersController from '../../controllers/generateUsers.controller.js';

const router = express.Router();

router.get('/', GenerateUsersController.viewGeneratedSample);

router.get('/:quantity', GenerateUsersController.viewGeneratedSample);

router.post('/', GenerateUsersController.pushGeneratedUsersToDatabase);

router.post('/:quantity', GenerateUsersController.pushGeneratedUsersToDatabase);

export default router;
