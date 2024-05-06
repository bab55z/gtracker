"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delivery_controller_1 = require("../controllers/delivery.controller");
const delivery_validators_1 = require("../middlewares/validators/delivery.validators");
const router = express_1.default.Router();
// create a new delivery route
router.post('/delivery', delivery_validators_1.CreateDeliveryValidator, delivery_controller_1.create);
// get all deliveries route
router.get('/delivery', delivery_controller_1.index);
// get a delivery route
router.get('/delivery/:deliveryId', delivery_controller_1.view);
// update a delivery route
router.put('/delivery/:deliveryId', delivery_validators_1.CreateDeliveryValidator, delivery_controller_1.update);
// delete a delivery route
router.delete('/delivery/:deliveryId', delivery_controller_1.destroy);
exports.default = router;
//# sourceMappingURL=delivery.route.js.map