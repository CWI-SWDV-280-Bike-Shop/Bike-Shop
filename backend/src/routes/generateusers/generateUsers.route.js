import express from 'express';
import GenerateUsersController from './generateUsers.controller.js';

const router = express.Router();

router.get('/', GenerateUsersController.getGeneratedUsers);

router.get('/:quantity', GenerateUsersController.getGeneratedUsers);

router.post('/', GenerateUsersController.createGeneratedUsers);

router.post('/:quantity', GenerateUsersController.createGeneratedUsers);

export default router;
