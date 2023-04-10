import express from 'express';
import AccessoryController from '../../controllers/accessory.controller.js';

const router = express.Router();

router.get('/', AccessoryController.getAccessories);

router.get('/:id', AccessoryController.getAccessoryById);

router.post('/', AccessoryController.createAccessory);

router.put('/:id', AccessoryController.updateAccessory);

router.delete('/:id', AccessoryController.deleteAccessory);

export default router;
