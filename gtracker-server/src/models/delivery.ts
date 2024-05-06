import {Model, Schema, model, Types, HydratedDocument, QueryWithHelpers, Document} from "mongoose";
import { ModelMethods, QueryHelperMethods } from "../services/delivery.service";
import { DeliveryStatus, Point } from "../types/common";

/**
 * Model interface definition.
 */
export interface Delivery {
    _id:Types.ObjectId;
    delivery_id:Types.ObjectId;
    package_id:Types.ObjectId;
    pickup_time :Date;
    start_time :Date;
    end_time :Date;
    location :Point;
    status :String;
    package:Types.ObjectId;
}

/**
 * Base Model configuration
 */
interface BaseModel extends Model<Delivery, {}, ModelMethods> {
    // STATIC METHODS DEFINITION
    createWithFullName(name: string): Promise<HydratedDocument<Delivery, ModelMethods>>;
}

/** 
 * Schema definition.
 */
export const schema = new Schema<Delivery, BaseModel, ModelMethods, QueryHelperMethods>({
    package_id: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    pickup_time: { type: Date, required: false },
    start_time: { type: Date, required: false },
    end_time: { type: Date, required: false },
    location: { type: Object, required: false },
    status: { type: String, enum:DeliveryStatus, default:DeliveryStatus.open, required: true, lowercase:true },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true }
}, {
    /**
     * Query helpers methods.
     */
    query: {
        byPackage(packageId: string) {
            return this.find({ package_id: packageId });
        },

        findWithPackage: function (deliveryId: string) {
            return this.find({ _id: deliveryId })
                .populate('package')
                .exec()
            ;
        }
    },

    /**
     * Model static methods implementation.
     */
    statics: {
    },

    /**
     * Options
     */
    timestamps: true
  });

/**
 * Model methods implementation (Defined in ModelMethods).
 */
schema.method('isFinalDelivery', function isFinalDelivery() {
    return this.status === DeliveryStatus.delivered || this.status === DeliveryStatus.failed;
});


export const DeliveryModel = model<Delivery, BaseModel>('Delivery', schema);