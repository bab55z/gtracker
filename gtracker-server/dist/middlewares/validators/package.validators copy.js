"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePackageValidator = void 0;
const express_validator_1 = require("express-validator");
exports.CreatePackageValidator = (0, express_validator_1.checkSchema)({
    description: { isString: true },
    weight: { isNumeric: true },
    width: { isNumeric: true },
    height: { isNumeric: true },
    depth: { isNumeric: true },
    from_name: { isString: true },
    from_address: { isString: true },
    from_location: { isObject: true },
    'from_location.lat': { isNumeric: true },
    'from_location.lng': { isNumeric: true },
    to_name: { isString: true },
    to_address: { isString: true },
    to_location: { isObject: true },
    'to_location.lat': { isNumeric: true },
    'to_location.lng': { isNumeric: true },
}, ['body']);
//# sourceMappingURL=package.validators%20copy.js.map