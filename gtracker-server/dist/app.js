"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const package_route_1 = __importDefault(require("./routes/package.route"));
const delivery_route_1 = __importDefault(require("./routes/delivery.route"));
const tracker_route_1 = __importDefault(require("./routes/tracker.route"));
const http_1 = __importDefault(require("http"));
const websocket_service_1 = __importDefault(require("./services/websocket.service"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.NODE_APP_PORT || 3000;
// handling CORS 
app.use((0, cors_1.default)());
// connect to db
(0, db_1.dbConnection)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set('trust proxy', true);
/**
 * default routes
 */
app.get('/', (req, res) => {
    res.send('Go! zmmmm!');
});
app.get('/api/heartbeat', (req, res) => {
    res.json({ message: `live! ${(new Date).toLocaleDateString()}` });
});
/**
 * Package routes
 */
app.use('/api', package_route_1.default);
/**
 * delivery routes
 */
app.use('/api', delivery_route_1.default);
/**
 * tracker routes
 */
app.use('/api', tracker_route_1.default);
/** Create HTTP server. */
global.liveUsers = [];
global.liveTrackers = [];
const server = http_1.default.createServer(app);
global.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const webSocketsService = new websocket_service_1.default();
/** Create socket connection */
global.io.on('connection', (socket) => {
    console.log('a user connected');
    webSocketsService.connection(socket);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port, () => {
    console.log(`⚡️ Summoned on port ${port}`);
});
//# sourceMappingURL=app.js.map