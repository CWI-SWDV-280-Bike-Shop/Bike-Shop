import user from '../controllers/user.js';
import { Router } from 'express';
const router = Router();

router.get('/users/:id', user.getUserById);

router.get('/users', user.getUsers);

router.post('/users', user.newUser);

router.delete('/users/:id', user.deleteUser);

router.put('/users', user.updateUser);

export default router;

