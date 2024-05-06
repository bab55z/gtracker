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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.view = exports.create = exports.index = void 0;
const express_validator_1 = require("express-validator");
const delivery_1 = require("../models/delivery");
const delivery_service_1 = require("../services/delivery.service");
const websocket_service_1 = __importDefault(require("../services/websocket.service"));
/**
 * Indexes deliveries
 * @param req
 * @param res
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield delivery_service_1.DeliveryService.getAllDeliveries();
        res.send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while saving."
        });
    }
});
exports.index = index;
/**
 * Creates a new delivery
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
        const md = new delivery_1.DeliveryModel(req.body);
        console.log(md);
        data = delivery_service_1.DeliveryService.createDelivery(md);
        // if an active tracker is running, add and broadcast the delivery statuses
        if (websocket_service_1.default.liveTrackerExists(req.body.package_id)) {
            websocket_service_1.default.pushStatusToLiveTracker(req.body.package_id, req.body, req.ip);
        }
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
 * Fetches a delivery
 * @param req
 * @param res
 */
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield delivery_service_1.DeliveryService.getDelivery(req.params.deliveryId);
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
 * updates a delivery
 * @param req
 * @param res
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // request validation
    console.log(req.params.deliveryId);
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
        const data = yield delivery_service_1.DeliveryService.updateDelivery(req.params.deliveryId, req.body);
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
 * Deletes a delivery
 * @param req
 * @param res
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield delivery_service_1.DeliveryService.deleteDelivery(req.params.deliveryId);
        res.send("OK");
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while deleting."
        });
    }
});
exports.destroy = destroy;
//# sourceMappingURL=delivery.controller.js.map