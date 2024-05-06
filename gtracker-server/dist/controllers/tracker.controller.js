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
exports.getStatusByTrackId = exports.getRecentStatus = exports.postStatus = exports.initiate = void 0;
const websocket_service_1 = __importDefault(require("../services/websocket.service"));
/**
 *
 * @param req
 * @param res
 */
const initiate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tracker = yield websocket_service_1.default.getLiveTracker(req.body.packageId, req.ip);
        console.log({ "initiatedTracker": tracker });
        res.send({ message: "ok" });
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while saving."
        });
    }
});
exports.initiate = initiate;
/**
 *
 * @param req
 * @param res
 */
const postStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while saving."
        });
    }
});
exports.postStatus = postStatus;
/**
 *
 * @param req
 * @param res
 */
const getRecentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while saving."
        });
    }
});
exports.getRecentStatus = getRecentStatus;
/**
 *
 * @param req
 * @param res
 */
const getStatusByTrackId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        res.status(500).send({
            message: "An error occurred while saving."
        });
    }
});
exports.getStatusByTrackId = getStatusByTrackId;
//# sourceMappingURL=tracker.controller.js.map