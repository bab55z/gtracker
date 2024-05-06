"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageService = void 0;
const package_1 = require("../models/package");
/**
 * OTHER METHODS
 */
/**
 * creates a new package in the database
 * @param parcel the package to create
 */
const createPackage = (parcel) => {
    console.log(parcel);
    const instance = new package_1.PackageModel(parcel);
    instance.save()
        .then((data) => data)
        .catch((err) => {
        console.error(err);
        return false;
    });
};
/**
 * EXPORTS
 */
exports.packageService = {
    createPackage
};
//# sourceMappingURL=package.service%20copy.js.map