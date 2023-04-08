import express from 'express';
import BikeController from '../../controllers/bike.controller.js';

const router = express.Router();

router.get('/', BikeController.getBikes);

router.get('/:id', BikeController.getBikeById);

router.post('/', BikeController.createBike);

router.put('/:id', BikeController.updateBike);

router.delete('/:id', BikeController.deleteBike);

export default router;
