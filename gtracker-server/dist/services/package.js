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
const createPackage = (parcel) => __awaiter(void 0, void 0, void 0, function* () {
    const instance = new package_1.PackageModel(parcel);
    yield instance.save()
        .then(() => true)
        .catch((err) => {
        console.error(err);
        return false;
    });
});
/**
 * EXPORTS
 */
exports.packageService = {
    createPackage
};
//# sourceMappingURL=package.js.map