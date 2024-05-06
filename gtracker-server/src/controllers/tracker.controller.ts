import WebSocketsService from "../services/websocket.service";


/**
 * 
 * @param req 
 * @param res 
 */
export const initiate = async (req, res) => {
  try{
    const tracker = await WebSocketsService.getLiveTracker(req.body.packageId,req.ip)
    console.log({"initiatedTracker":tracker})
    res.send({message:"ok"});

  }
  catch(e){
    res.status(500).send({
      message:"An error occurred while saving."
    });
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
export const postStatus = async (req, res) => {
  try{
  }
  catch(e){
    res.status(500).send({
      message:"An error occurred while saving."
    });
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
export const getRecentStatus = async (req, res) => {
  try{
  }
  catch(e){
    res.status(500).send({
      message:"An error occurred while saving."
    });
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
export const getStatusByTrackId = async (req, res) => {
  try{
  }
  catch(e){
    res.status(500).send({
      message:"An error occurred while saving."
    });
  }
}

