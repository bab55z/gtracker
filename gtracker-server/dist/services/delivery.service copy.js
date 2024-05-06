"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryService = void 0;
const delivery_1 = require("../models/delivery");
const package_service_1 = require("./package.service");
/**
 * OTHER METHODS
 */
/**
 * creates a new delivery in the database
 * @param delivery the delivery to create
 */
const createDelivery = (delivery) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveryInstance = new delivery_1.DeliveryModel(delivery);
    deliveryInstance.package = delivery.package_id;
    const parcel = yield package_service_1.packageService.getPackage(delivery.package_id.toString());
    if (!parcel) {
        console.error(`Unable to find a package with id ${delivery.package_id.toString()}`);
        return false;
    }
    // get the current location from the corresponding if the status is open
    if (delivery.status === "open") {
        deliveryInstance.location = parcel.from_location;
    }
    yield deliveryInstance.save();
    // add the new delivery id to the package deliveries property
    parcel.deliveries.push(deliveryInstance);
    // update the package currently active delivery
    // if the delivery is getting closed remove active delivery, otherwise
    if (["delivered", "failed"].includes(delivery.status.toString())) {
        parcel.active_delivery_id = null;
        parcel.active_delivery = null;
    }
    else {
        parcel.active_delivery_id = deliveryInstance._id;
        parcel.active_delivery = deliveryInstance._id;
    }
    parcel.save();
});
/**
 * fetches all deliveries from database
 */
const getAllDeliveries = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield delivery_1.DeliveryModel.find().sort({ createdAt: -1 });
    return data;
});
/**
 * gets a delivery from the database
 * @param deliveryId the delivery id
 */
const getDelivery = (deliveryId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield delivery_1.DeliveryModel.findById(deliveryId);
    return data;
});
/**
 * deletes a delivery from the database
 * @param deliveryId the delivery id
 */
const deleteDelivery = (deliveryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield delivery_1.DeliveryModel.findByIdAndDelete(deliveryId);
    return result;
});
/**
 * updates a delivery from the database
 * @param deliveryId the delivery id
 * @param delivery the update object
 */
const updateDelivery = (deliveryId, delivery) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield delivery_1.DeliveryModel.findOneAndUpdate({ _id: deliveryId }, Object.assign(Object.assign({}, delivery), { package: delivery.package_id }));
    return data;
});
/**
 * EXPORTS
 */
exports.DeliveryService = {
    createDelivery,
    getAllDeliveries,
    getDelivery,
    deleteDelivery,
    updateDelivery
};
//# sourceMappingURL=delivery.service%20copy.js.map