import { get } from "mongoose";
import { Delivery, DeliveryModel } from "../models/delivery";
import { DeliveryService } from "./delivery.service";
import { DeliveryStatus } from "../types/common";
import { packageService } from "./package.service";

export default class WebSocketsService {
    users = [];
    connection(client) {
        console.log("🇳🇬 connection ws");
      // event fired when the tracker is disconnected
      client.on("disconnect", () => {
        this.users = this.users.filter((user) => user.socketId !== client.id);
        console.log({"🇳🇬 ws user disconnects":this.users});
      });

      // add identity of user mapped to the socket id
      client.on("identity", (userIpAddress) => {
        this.users.push({
          socketId: client.id,
          userId: userIpAddress,
        });
        console.log({"🇳🇬  ws user log": userIpAddress})
      });

      // delivery status update
      client.on("status_changed", async (data) => {
        console.log({"🇳🇬  ws status_changed": data})

        // get the delivery object with its package
        const delivery: Delivery = await DeliveryService.getDelivery(data.delivery_id)
        const parcel = await packageService.getPackage(delivery.package_id.toString());
        if(!parcel || !delivery){
            console.log("🇳🇬 delivery or parcel not found");
            return;
        }
        // update the delivery
        console.log({"🇳🇬 delivery after su":delivery})
        let broadcast = false;
        switch(data.status){
            case "picked-up":
                if(delivery.status == "open"){
                    delivery.pickup_time = new Date();
                    delivery.status = data.status;
                    broadcast = true;
                }
            break;
            case "in-transit":
                if(delivery.status == "picked-up"){
                    delivery.start_time = new Date();
                    delivery.status = data.status;
                    broadcast = true;
                }
            break;
            case "delivered":
            case "failed":
                if(delivery.status == "in-transit"){
                    delivery.end_time = new Date();
                    delivery.status = data.status;
                    broadcast = true;
                }
            break;
        }
        await DeliveryService.updateDelivery(delivery._id.toString(), delivery)

        // emit a delivery_updated event
        if(broadcast){
            global.io.emit("delivery_updated", {event:"delivery_updated", delivery})
        }

        // update package
        if(["delivered", "failed"].includes(data.status)){
            parcel.active_delivery_id = null;
            parcel.active_delivery = null;
        }
        else{
            parcel.active_delivery_id = delivery._id;
            parcel.active_delivery = delivery._id;
        }
    
        parcel.save();
      });

      // delivery location update
      client.on("location_changed", async(data) => {
        console.log({"🇳🇬  ws location_changed": data})
        // get the delivery object with its package
        const delivery: Delivery = await DeliveryService.getDelivery(data.delivery_id)
        delivery.location = data.location;
        await DeliveryService.updateDelivery(delivery._id.toString(), delivery)
        global.io.emit("delivery_updated", {event:"delivery_updated", delivery});
      });

      // subscribe person to liveTracker
      client.on("subscribe", (liveTracker) => {
        client.join(liveTracker);
        console.log({"🇳🇬 ws subscribe": liveTracker})
      });

      // leave a liveTracker
      client.on("unsubscribe", (liveTracker) => {
        client.leave(liveTracker);
        console.log({"🇳🇬 ws un-subscribe": liveTracker})
        });
    }
  
    subscribeOtherUser(liveTracker, otherUserIpAddress) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserIpAddress
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(liveTracker);
        }
      });
    }

    // creates a new instance or returns and existing one
    static async getLiveTracker (packageId, userIpAddress): Promise<LiveTracker> {
        // check if a tracker already exists
        console.log({"tracker global": JSON.stringify(global.liveTrackers)});
        const existingTracker = global.liveTrackers.find((tracker) => tracker.packageId === packageId);
        if(existingTracker){
            return  existingTracker;
        }
        // if not create
        // get previous statuses of the package
        const previousStatuses = await DeliveryModel.find({package_id : packageId}).sort({ createdAt: -1 }).exec();
        const newTracker = {
            packageId:packageId,
            statuses:previousStatuses,
            userIpAddresses:[userIpAddress]
        };
        global.liveTrackers.push(newTracker);
        return newTracker;
    }

    static async pushStatusToLiveTracker (packageId, delivery: Delivery, userIpAddress): Promise<LiveTracker> {
        // check if a tracker already exists
        const liveTracker = await this.getLiveTracker(packageId, userIpAddress);
        console.log({delivery})
        liveTracker.statuses.unshift(delivery);
        console.log({"liveTracker.statuses": liveTracker.statuses})

        // broadcast message
        global.io.emit("delivery_updated", {event:"delivery_updated", delivery})

        return liveTracker
    }

    static liveTrackerExists (packageId): boolean{
        return global.liveTrackers.filter((tracker) => tracker.packageId === packageId).length > 0;
    }

  }

  export interface LiveTracker {
    packageId:string;
    userIpAddresses:string[];
    statuses:any[];
  }