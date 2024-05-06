import { HydratedDocument, QueryWithHelpers } from "mongoose";
import { Package, PackageModel } from "../models/package";

/**
 * MODEL METHODS
 * Following interface methods need to be implemented
 * into the corresponding mongoose model.
 */
export interface ModelMethods {
    // last updated date
    lastUpdate(): string;

    // delivery attempts count
    deliveryAttempts(): number;
}

/**
 * MODEL QUERY HELPER METHODS
 * Following interface methods need to be implemented
 * into the corresponding mongoose model.
 */
export interface QueryHelperMethods {

    // get packages with deliveries
    findWithDeliveries(packageId: string): QueryWithHelpers<
      HydratedDocument<Package>[],
      HydratedDocument<Package>,
      QueryHelperMethods
    >
  }

/**
 * OTHER METHODS
 */

/**
 * creates a new package in the database
 * @param parcel the package to create
 */
const createPackage = (parcel: Package) => {
    const instance: HydratedDocument<Package> = new PackageModel(parcel);
    instance.save()
    .then((data) => data)
    .catch((err) => {
        console.error(err);
        return false;
    });
}

/**
 * fetches all packages from database
 */
const getAllPackages = async () => {
    const data = await PackageModel.find().sort({ createdAt: -1 });
    return data;
}

/**
 * gets a package from the database
 * @param packageId the package id
 */
const getPackage = async (packageId: string) => {
    const data = await PackageModel.findById(packageId)
    .populate({path: 'deliveries', options: { sort: { 'createdAt': -1 } } })
    .populate('active_delivery')
    .exec();
    return data;
}

/**
 * deletes a package from the database
 * @param packageId the package id
 */
const deletePackage = async (packageId: string) => {
    console.log(packageId)
    const result = await PackageModel.findByIdAndDelete(packageId);
    return result;
}

/**
 * updates a package from the database
 * @param packageId the package id
 * @param parcel the update object
 */
const updatePackage = async (packageId: string, parcel: Package) => {
    const data = await PackageModel.findOneAndUpdate({ _id: packageId }, parcel)
    return data;
}

/**
 * EXPORTS
 */
export const packageService = {
    createPackage,
    getAllPackages,
    getPackage,
    deletePackage,
    updatePackage
};