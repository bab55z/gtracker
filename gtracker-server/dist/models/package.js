"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageModel = exports.schema = void 0;
const mongoose_1 = require("mongoose");
/**
 * Schema definition.
 */
exports.schema = new mongoose_1.Schema({
    active_delivery_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Delivery' },
    package_id: { type: String },
    description: { type: String, required: true },
    weight: { type: Number, required: false },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    depth: { type: Number, required: false },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false }
    },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    to_location: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false }
    },
    deliveries: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Delivery' }],
    active_delivery: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Delivery' },
}, {
    /**
     * Query helpers methods.
     */
    query: {
        findWithDeliveries(packageId) {
            return this.findB({ _id: packageId })
                .populate('deliveries')
                .exec();
        }
    },
    /**
     * Model static methods implementation.
     */
    statics: {
        createWithFullName(name) {
            const [firstName, lastName] = name.split(' ');
            return this.create({ firstName, lastName });
        }
    },
    /**
     * Options
     */
    timestamps: true
}).pre('save', function (next) {
    if (!this.package_id) {
        this.package_id = this._id.toString();
    }
    next();
});
/**
 * Model methods implementation (Defined in ModelMethods).
 */
exports.schema.method('lastUpdate', function lastUpdate() {
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
exports.PackageModel = (0, mongoose_1.model)('Package', exports.schema);
//# sourceMappingURL=package.js.map