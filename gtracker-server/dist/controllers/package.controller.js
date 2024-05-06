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
exports.destroy = exports.update = exports.view = exports.create = exports.suggestIds = exports.index = void 0;
const express_validator_1 = require("express-validator");
const package_1 = require("../models/package");
const package_service_1 = require("../services/package.service");
/**
 * Indexes packages
 * @param req
 * @param res
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield package_service_1.packageService.getAllPackages();
        res.send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while fetching data."
        });
    }
});
exports.index = index;
/**
 * suggest packages id
 * @param req
 * @param res
 */
const suggestIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.input) {
        console.log("provide an input for suggestions");
        return [];
    }
    try {
        const data = yield package_1.PackageModel.find({
            package_id: { $regex: '.*' + req.query.input + '.*' }
        }).limit(10);
        res.send(data.map((parcel) => parcel._id));
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: "An error occurred while fetching data."
        });
    }
});
exports.suggestIds = suggestIds;
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
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield package_service_1.packageService.getPackage(req.params.packageId);
        console.log({ data });
        res.send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while fetching data."
        });
    }
});
exports.view = view;
/**
 * updates a package
 * @param req
 * @param res
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // request validation
    console.log(req.params.packageId);
    var err = (0, express_validator_1.validationResult)(req);
    if (!err.isEmpty()) {
        console.log(err.mapped());
        res.status(400).send({
            message: "Provided data are not valid.",
            data: err.mapped()
        });
        return;
    }
    // update & save
    try {
        const data = yield package_service_1.packageService.updatePackage(req.params.packageId, req.body);
        res.send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while updating."
        });
    }
});
exports.update = update;
/**
 * Deletes a package
 * @param req
 * @param res
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield package_service_1.packageService.deletePackage(req.params.packageId);
        res.send("OK");
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while deleting."
        });
    }
});
exports.destroy = destroy;
//# sourceMappingURL=package.controller.js.map