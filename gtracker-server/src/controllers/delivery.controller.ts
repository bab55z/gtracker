import { validationResult } from "express-validator";
import { DeliveryModel } from "../models/delivery";
import { DeliveryService } from "../services/delivery.service"
import WebSocketsService from "../services/websocket.service";

/**
 * Indexes deliveries
 * @param req 
 * @param res 
 */
export const index = async (req, res) => {
  try{
    const data = await DeliveryService.getAllDeliveries()
    res.send(data);
  }
  catch(e){
    res.status(500).send({
      message:"An error occurred while saving."
    });
  }
}

/**
 * Creates a new delivery
 * @param req 
 * @param res 
 */
export const create = async (req, res) => {
    // Validation
    var err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err.mapped())
      res.status(400).send({
              message: "Provided data are not valid.",
              data:err.mapped()
          });
          return;
    }

    // Create & save
    let data;
    try{
      const md = new DeliveryModel(req.body)
      console.log(md)
      data = DeliveryService.createDelivery(md);

      // if an active tracker is running, add and broadcast the delivery statuses
      if(WebSocketsService.liveTrackerExists(req.body.package_id)){
        WebSocketsService.pushStatusToLiveTracker(req.body.package_id, req.body, req.ip)
      }
      
      res.send(data);
    }
    catch(e){
      res.status(500).send({
        message:"An error occurred while saving."
      });
    }
}

/**
 * Fetches a delivery
 * @param req 
 * @param res 
 */
export const view = async (req, res) => {
  try{
    const data = await DeliveryService.getDelivery(req.params.deliveryId);
    console.log({data})
     res.send(data);
   }
   catch(e){
     res.status(500).send({
       message:"An error occurred while fetching data."
     });
   }
}

/**
 * updates a delivery
 * @param req 
 * @param res 
 */
export const update = async (req, res) => {
 // request validation
 console.log(req.params.deliveryId)
  var err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err.mapped())
      res.status(400).send({
              message: "Provided data are not valid.",
              data:err.mapped()
          });
          return;
    }

    // update & save
  try{
     const data = await DeliveryService.updateDelivery(req.params.deliveryId, req.body);
     res.send(data);
   }
   catch(e){
     res.status(500).send({
       message:"An error occurred while updating."
     });
  }
}
/**
 * Deletes a delivery
 * @param req 
 * @param res 
 */
export const destroy = async (req, res) => {
  try{
    const result = await DeliveryService.deleteDelivery(req.params.deliveryId);
    res.send("OK");
  }
  catch(e){
    res.status(500).send({
      message:"An error occurred while deleting."
    });
   }
}

