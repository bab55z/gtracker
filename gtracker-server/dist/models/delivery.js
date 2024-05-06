"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryModel = exports.schema = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../types/common");
/**
 * Schema definition.
 */
exports.schema = new mongoose_1.Schema({
    package_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Package', required: true },
    pickup_time: { type: Date, required: false },
    start_time: { type: Date, required: false },
    end_time: { type: Date, required: false },
    location: { type: Object, required: false },
    status: { type: String, enum: common_1.DeliveryStatus, default: common_1.DeliveryStatus.open, required: true, lowercase: true },
    package: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Package', required: true }
}, {
    /**
     * Query helpers methods.
     */
    query: {
        byPackage(packageId) {
            return this.find({ package_id: packageId });
        },
        findWithPackage: function (deliveryId) {
            return this.find({ _id: deliveryId })
                .populate('package')
                .exec();
        }
    },
    /**
     * Model static methods implementation.
     */
    statics: {},
    /**
     * Options
     */
    timestamps: true
});
/**
 * Model methods implementation (Defined in ModelMethods).
 */
exports.schema.method('isFinalDelivery', function isFinalDelivery() {
    return this.status === common_1.DeliveryStatus.delivered || this.status === common_1.DeliveryStatus.failed;
});
exports.DeliveryModel = (0, mongoose_1.model)('Delivery', exports.schema);
//# sourceMappingURL=delivery.js.map