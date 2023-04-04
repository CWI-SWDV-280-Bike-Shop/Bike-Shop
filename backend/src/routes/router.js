import userRoute from './user.js';
import { Router } from 'express';
const router = Router();

// Users routes

router.use(userRoute);

export default router;

