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
    const instance = new package_1.PackageModel(parcel);
    instance.save()
        .then((data) => data)
        .catch((err) => {
        console.error(err);
        return false;
    });
};
/**
 * fetches all packages from database
 */
const getAllPackages = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield package_1.PackageModel.find().sort({ createdAt: -1 });
    return data;
});
/**
 * gets a package from the database
 * @param packageId the package id
 */
const getPackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield package_1.PackageModel.findById(packageId)
        .populate({ path: 'deliveries', options: { sort: { 'createdAt': -1 } } })
        .populate('active_delivery')
        .exec();
    return data;
});
/**
 * deletes a package from the database
 * @param packageId the package id
 */
const deletePackage = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(packageId);
    const result = yield package_1.PackageModel.findByIdAndDelete(packageId);
    return result;
});
/**
 * updates a package from the database
 * @param packageId the package id
 * @param parcel the update object
 */
const updatePackage = (packageId, parcel) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield package_1.PackageModel.findOneAndUpdate({ _id: packageId }, parcel);
    return data;
});
/**
 * EXPORTS
 */
exports.packageService = {
    createPackage,
    getAllPackages,
    getPackage,
    deletePackage,
    updatePackage
};
//# sourceMappingURL=package.service.js.map