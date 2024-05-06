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
const delivery_1 = require("../models/delivery");
const delivery_service_1 = require("./delivery.service");
const package_service_1 = require("./package.service");
class WebSocketsService {
    constructor() {
        this.users = [];
    }
    connection(client) {
        console.log("🇳🇬 connection ws");
        // event fired when the tracker is disconnected
        client.on("disconnect", () => {
            this.users = this.users.filter((user) => user.socketId !== client.id);
            console.log({ "🇳🇬 ws user disconnects": this.users });
        });
        // add identity of user mapped to the socket id
        client.on("identity", (userIpAddress) => {
            this.users.push({
                socketId: client.id,
                userId: userIpAddress,
            });
            console.log({ "🇳🇬  ws user log": userIpAddress });
        });
        // delivery status update
        client.on("status_changed", (data) => __awaiter(this, void 0, void 0, function* () {
            console.log({ "🇳🇬  ws status_changed": data });
            // get the delivery object with its package
            const delivery = yield delivery_service_1.DeliveryService.getDelivery(data.delivery_id);
            const parcel = yield package_service_1.packageService.getPackage(delivery.package_id.toString());
            if (!parcel || !delivery) {
                console.log("🇳🇬 delivery or parcel not found");
                return;
            }
            // update the delivery
            console.log({ "🇳🇬 delivery after su": delivery });
            let broadcast = false;
            switch (data.status) {
                case "picked-up":
                    if (delivery.status == "open") {
                        delivery.pickup_time = new Date();
                        delivery.status = data.status;
                        broadcast = true;
                    }
                    break;
                case "in-transit":
                    if (delivery.status == "picked-up") {
                        delivery.start_time = new Date();
                        delivery.status = data.status;
                        broadcast = true;
                    }
                    break;
                case "delivered":
                case "failed":
                    if (delivery.status == "in-transit") {
                        delivery.end_time = new Date();
                        delivery.status = data.status;
                        broadcast = true;
                    }
                    break;
            }
            yield delivery_service_1.DeliveryService.updateDelivery(delivery._id.toString(), delivery);
            // emit a delivery_updated event
            if (broadcast) {
                global.io.emit("delivery_updated", { event: "delivery_updated", delivery });
            }
            // update package
            if (["delivered", "failed"].includes(data.status)) {
                parcel.active_delivery_id = null;
                parcel.active_delivery = null;
            }
            else {
                parcel.active_delivery_id = delivery._id;
                parcel.active_delivery = delivery._id;
            }
            parcel.save();
        }));
        // delivery location update
        client.on("location_changed", (data) => __awaiter(this, void 0, void 0, function* () {
            console.log({ "🇳🇬  ws location_changed": data });
            // get the delivery object with its package
            const delivery = yield delivery_service_1.DeliveryService.getDelivery(data.delivery_id);
            delivery.location = data.location;
            yield delivery_service_1.DeliveryService.updateDelivery(delivery._id.toString(), delivery);
            global.io.emit("delivery_updated", { event: "delivery_updated", delivery });
        }));
        // subscribe person to liveTracker
        client.on("subscribe", (liveTracker) => {
            client.join(liveTracker);
            console.log({ "🇳🇬 ws subscribe": liveTracker });
        });
        // leave a liveTracker
        client.on("unsubscribe", (liveTracker) => {
            client.leave(liveTracker);
            console.log({ "🇳🇬 ws un-subscribe": liveTracker });
        });
    }
    subscribeOtherUser(liveTracker, otherUserIpAddress) {
        const userSockets = this.users.filter((user) => user.userId === otherUserIpAddress);
        userSockets.map((userInfo) => {
            const socketConn = global.io.sockets.connected(userInfo.socketId);
            if (socketConn) {
                socketConn.join(liveTracker);
            }
        });
    }
    // creates a new instance or returns and existing one
    static getLiveTracker(packageId, userIpAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if a tracker already exists
            console.log({ "tracker global": JSON.stringify(global.liveTrackers) });
            const existingTracker = global.liveTrackers.find((tracker) => tracker.packageId === packageId);
            if (existingTracker) {
                return existingTracker;
            }
            // if not create
            // get previous statuses of the package
            const previousStatuses = yield delivery_1.DeliveryModel.find({ package_id: packageId }).sort({ createdAt: -1 }).exec();
            const newTracker = {
                packageId: packageId,
                statuses: previousStatuses,
                userIpAddresses: [userIpAddress]
            };
            global.liveTrackers.push(newTracker);
            return newTracker;
        });
    }
    static pushStatusToLiveTracker(packageId, delivery, userIpAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if a tracker already exists
            const liveTracker = yield this.getLiveTracker(packageId, userIpAddress);
            console.log({ delivery });
            liveTracker.statuses.unshift(delivery);
            console.log({ "liveTracker.statuses": liveTracker.statuses });
            // broadcast message
            global.io.emit("delivery_updated", { event: "delivery_updated", delivery });
            return liveTracker;
        });
    }
    static liveTrackerExists(packageId) {
        return global.liveTrackers.filter((tracker) => tracker.packageId === packageId).length > 0;
    }
}
exports.default = WebSocketsService;
//# sourceMappingURL=websocket.service.js.map