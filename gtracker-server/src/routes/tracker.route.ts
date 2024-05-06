import express from "express"
import { initiate, postStatus, getRecentStatus, getStatusByTrackId } from "../controllers/tracker.controller"

const router = express.Router();

router.get('/tracker/', getRecentStatus);
router.get('/tracker/:trackId', getStatusByTrackId);
router.post('/tracker/initiate', initiate);
router.post('/tracker/:trackId/status', postStatus);

export default router;