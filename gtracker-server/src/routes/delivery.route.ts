import express from "express"
import { create, index, view, update, destroy } from "../controllers/delivery.controller"
import { CreateDeliveryValidator } from "../middlewares/validators/delivery.validators";

const router = express.Router();

// create a new delivery route
router.post('/delivery',CreateDeliveryValidator, create);

// get all deliveries route
router.get('/delivery', index);

// get a delivery route
router.get('/delivery/:deliveryId', view);

// update a delivery route
router.put('/delivery/:deliveryId', CreateDeliveryValidator, update);

// delete a delivery route
router.delete('/delivery/:deliveryId', destroy);
export default router;