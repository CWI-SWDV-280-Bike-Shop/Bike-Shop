import express from 'express';
import BikeController from '../../controllers/bike.controller.js';

const router = express.Router();

router.get('/', BikeController.find);

router.get('/:id', BikeController.getById);

router.post('/', BikeController.create);

router.put('/:id', BikeController.update);

router.delete('/:id', BikeController.delete);

export default router;
