import {Model, Schema, model, Types, HydratedDocument, QueryWithHelpers} from "mongoose";
import { ModelMethods, QueryHelperMethods } from "../services/package.service";
import { Point } from "../types/common";
import { Delivery } from "./delivery";

/**
 * Model interface definition.
 */
export interface Package {
    package_id:String;
    active_delivery_id:Types.ObjectId;
    active_delivery:Types.ObjectId;
    description :String;
    weight :Number;
    width :Number;
    height :Number;
    depth :Number;
    from_name :String;
    from_address :String;
    from_location :Point;
    to_name :String;
    to_address :String; 
    to_location :Point;
    deliveries:Delivery[]
}

/**
 * Base Model configuration
 */
interface BaseModel extends Model<Package, {}, ModelMethods> {
    // STATIC METHODS DEFINITION
    createWithFullName(name: string): Promise<HydratedDocument<Package, ModelMethods>>;
}

/** 
 * Schema definition.
 */
export const schema = new Schema<Package, BaseModel, ModelMethods, QueryHelperMethods>({
    active_delivery_id: { type: Schema.Types.ObjectId, ref: 'Delivery' },
    package_id: { type: String },
    description: { type: String, required: true },
    weight: { type: Number, required: false },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    depth: { type: Number, required: false },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: {
        lat:{ type: Number, required: false },
        lng:{ type: Number, required: false }
    },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    to_location: {
        lat:{ type: Number, required: false },
        lng:{ type: Number, required: false }
    },
    deliveries: [{ type: Schema.Types.ObjectId, ref: 'Delivery' }],
    active_delivery: { type: Schema.Types.ObjectId, ref: 'Delivery' },
}, {
    /**
     * Query helpers methods.
     */
    query: {
        findWithDeliveries(packageId: string) {
            return this.findB({ _id: packageId })
                .populate('deliveries')
                .exec()
            ;
        }
    },

    /**
     * Model static methods implementation.
     */
    statics: {
        createWithFullName(name: string) {
            const [firstName, lastName] = name.split(' ');
            return this.create({ firstName, lastName });
        }
      },

    /**
     * Options
     */
    timestamps: true
  }).pre('save', function(next) {
    if (!this.package_id) {
      this.package_id = this._id.toString();
    }
    next();
  });

/**
 * Model methods implementation (Defined in ModelMethods).
 */
schema.method('lastUpdate', function lastUpdate() {
    return this.active_delivery_id;
});


/**
 * Model static methods implementation.
 */
// schema.static('createWithFullName', function createWithFullName(name: string) {
//     const [firstName, lastName] = name.split(' ');
//     return this.create({ firstName, lastName });
//   });


/**
 * Query helpers methods.
 */
// schema.query.byName = function byName(
//     this: QueryWithHelpers<any, HydratedDocument<Package>, QueryHelperMethods>,
//     name: string
//   ) {
//     return this.find({ name: name });
//   };


export const PackageModel = model<Package, BaseModel>('Package', schema);