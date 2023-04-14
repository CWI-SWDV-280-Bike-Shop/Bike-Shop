import express from 'express';
import AccessoryController from '../../controllers/accessory.controller.js';

const router = express.Router();

router.get('/', AccessoryController.find);

router.get('/:id', AccessoryController.getById);

router.post('/', AccessoryController.create);

router.put('/:id', AccessoryController.update);

router.delete('/:id', AccessoryController.delete);

export default router;
