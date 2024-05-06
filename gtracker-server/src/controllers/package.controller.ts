import { validationResult } from "express-validator";
import { PackageModel } from "../models/package";
import { packageService } from "../services/package.service"

/**
 * Indexes packages
 * @param req 
 * @param res 
 */
export const index = async (req, res) => {
  try{
    const data = await packageService.getAllPackages()
    res.send(data);
  }
  catch(e){
    res.status(500).send({
      message:"An error occurred while fetching data."
    });
  }
}
/**
 * suggest packages id
 * @param req 
 * @param res 
 */
export const suggestIds = async (req, res) => {
  if(!req.query.input){
    console.log("provide an input for suggestions")
    return [];
  }
  try{
    const data = await PackageModel.find({
      package_id:{$regex: '.*' + req.query.input + '.*'}
    }).limit(10);
    res.send(data.map((parcel) => parcel._id));
  }
  catch(e){
    console.log(e)
    res.status(500).send({
      message:"An error occurred while fetching data."
    });
  }
}

/**
 * Creates a new package
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
      const md = new PackageModel(req.body)
      data = packageService.createPackage(md);
      res.send(data);
    }
    catch(e){
      res.status(500).send({
        message:"An error occurred while saving."
      });
    }
}

/**
 * Fetches a package
 * @param req 
 * @param res 
 */
export const view = async (req, res) => {
 try{
  const data = await packageService.getPackage(req.params.packageId);
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
 * updates a package
 * @param req 
 * @param res 
 */
export const update = async (req, res) => {
 // request validation
 console.log(req.params.packageId)
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
     const data = await packageService.updatePackage(req.params.packageId, req.body);
     res.send(data);
   }
   catch(e){
     res.status(500).send({
       message:"An error occurred while updating."
     });
  }
}
/**
 * Deletes a package
 * @param req 
 * @param res 
 */
export const destroy = async (req, res) => {
 try{
   const result = await packageService.deletePackage(req.params.packageId);
   res.send("OK");
 }
 catch(e){
   res.status(500).send({
     message:"An error occurred while deleting."
   });
  }
}
