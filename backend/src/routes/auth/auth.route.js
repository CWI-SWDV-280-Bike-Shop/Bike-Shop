import express from 'express';
import AuthController from './auth.controller.js';

const router = express.Router();

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.post('/refresh', AuthController.refreshToken);

export default router;
