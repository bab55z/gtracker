"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tracker_controller_1 = require("../controllers/tracker.controller");
const router = express_1.default.Router();
router.get('/tracker/', tracker_controller_1.getRecentStatus);
router.get('/tracker/:trackId', tracker_controller_1.getStatusByTrackId);
router.post('/tracker/initiate', tracker_controller_1.initiate);
router.post('/tracker/:trackId/status', tracker_controller_1.postStatus);
exports.default = router;
//# sourceMappingURL=tracker.route.js.map