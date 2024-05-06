import { HydratedDocument, QueryWithHelpers } from "mongoose";
import { Delivery, DeliveryModel } from "../models/delivery";
import { packageService } from "./package.service";

/**
 * MODEL METHODS
 * Following interface methods need to be implemented
 * into the corresponding mongoose model.
 */
export interface ModelMethods {
    // last updated date
    isFinalDelivery(): string;
}

/**
 * MODEL QUERY HELPER METHODS
 * Following interface methods need to be implemented
 * into the corresponding mongoose model.
 */
export interface QueryHelperMethods {

    // get delivery by package
    byPackage(packageId: string): QueryWithHelpers<
      HydratedDocument<Delivery>[],
      HydratedDocument<Delivery>,
      QueryHelperMethods
    >;

    // get delivery with the package populated
    findWithPackage(deliveryId: string): QueryWithHelpers<
      HydratedDocument<Delivery>[],
      HydratedDocument<Delivery>,
      QueryHelperMethods
    >
}

/**
 * OTHER METHODS
 */

/**
 * creates a new delivery in the database
 * @param delivery the delivery to create
 */
const createDelivery = async (delivery: Delivery) => {
    const deliveryInstance: HydratedDocument<Delivery> = new DeliveryModel(delivery);
    deliveryInstance.package = delivery.package_id;

    const parcel = await packageService.getPackage(delivery.package_id.toString());
    if(!parcel){
        console.error(`Unable to find a package with id ${delivery.package_id.toString()}`);
        return false;
    }

    // get the current location from the corresponding if the status is open
    if(delivery.status === "open"){
        deliveryInstance.location = parcel.from_location;
    }

    await deliveryInstance.save()

    // add the new delivery id to the package deliveries property
    parcel.deliveries.push(deliveryInstance);

    // update the package currently active delivery
     // if the delivery is getting closed remove active delivery, otherwise
     if(["delivered", "failed"].includes(delivery.status.toString())){
        parcel.active_delivery_id = null;
        parcel.active_delivery = null;
    }
    else{
        parcel.active_delivery_id = deliveryInstance._id;
        parcel.active_delivery = deliveryInstance._id;
    }

    parcel.save();
}

/**
 * fetches all deliveries from database
 */
const getAllDeliveries = async () => {
    const data = await DeliveryModel.find().sort({ createdAt: -1 });
    return data;
}

/**
 * gets a delivery from the database
 * @param deliveryId the delivery id
 */
const getDelivery = async (deliveryId: string) => {
    const data = await DeliveryModel.findById(deliveryId)
    return data;
}

/**
 * deletes a delivery from the database
 * @param deliveryId the delivery id
 */
const deleteDelivery = async (deliveryId: string) => {
    const result = await DeliveryModel.findByIdAndDelete(deliveryId);
    return result;
}

/**
 * updates a delivery from the database
 * @param deliveryId the delivery id
 * @param delivery the update object
 */
const updateDelivery = async (deliveryId: string, delivery: Delivery) => {
    const data = await DeliveryModel.findOneAndUpdate({ _id: deliveryId }, {...delivery, package:delivery.package_id})
    return data;
}

/**
 * EXPORTS
 */
export const DeliveryService = {
    createDelivery,
    getAllDeliveries,
    getDelivery,
    deleteDelivery,
    updateDelivery

};