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
exports.remove = exports.update = exports.find = exports.create = exports.index = void 0;
const express_validator_1 = require("express-validator");
const package_1 = require("../models/package");
const package_service_1 = require("../services/package.service");
/**
 * Indexes packages
 * @param req
 * @param res
 */
const index = (req, res) => {
};
exports.index = index;
/**
 * Creates a new package
 * @param req
 * @param res
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation
    var err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        console.log(err.mapped());
        res.status(400).send({
            message: "Provided data are not valid.",
            data: err.mapped()
        });
        return;
    }
    // Create & save
    let data;
    try {
        const md = new package_1.PackageModel(req.body);
        console.log(md);
        data = package_service_1.packageService.createPackage(md);
        res.send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while saving."
        });
    }
});
exports.create = create;
/**
 * Fetches a package
 * @param req
 * @param res
 */
const find = (req, res) => {
};
exports.find = find;
/**
 * updates a package
 * @param req
 * @param res
 */
const update = (req, res) => {
};
exports.update = update;
/**
 * Deletes a package
 * @param req
 * @param res
 */
const remove = (req, res) => {
};
exports.remove = remove;
function keys() {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=package.controller%20copy.js.map