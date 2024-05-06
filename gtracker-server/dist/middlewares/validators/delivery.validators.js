"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryValidator = void 0;
const express_validator_1 = require("express-validator");
const common_1 = require("../../types/common");
exports.CreateDeliveryValidator = (0, express_validator_1.checkSchema)({
    package_id: { isString: true },
    pickup_time: {
        isString: true,
        // isDate: {options:{format:"YYYY-mm-dd"}}, 
        optional: { options: { values: "falsy" } }
    },
    start_time: {
        isString: true,
        // isDate: {options:{format:"YYYY-mm-ddTHH:MM:ssZ"}}, 
        optional: { options: { values: "falsy" } }
    },
    end_time: {
        isString: true,
        // isDate: {options:{format:"YYYY-mm-ddTHH:MM:ssZ"}}, 
        optional: { options: { values: "falsy" } },
    },
    status: {
        toLowerCase: true,
        isIn: { options: [Object.values(common_1.DeliveryStatus)] },
        optional: { options: { values: "falsy" } }
    },
    // location: {  isObject: true },
    // 'location.lat': { isNumeric: true },
    // 'location.lng': { isNumeric: true },
}, ['body']);
//# sourceMappingURL=delivery.validators.js.map