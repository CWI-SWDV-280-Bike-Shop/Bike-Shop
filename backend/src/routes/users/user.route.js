import express from 'express';
import UserController from './user.controller.js';

const router = express.Router();

router.get('/', UserController.find);

router.get('/:id', UserController.getById);

router.post('/', UserController.create);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.delete);

export default router;
