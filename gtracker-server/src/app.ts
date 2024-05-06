import 'dotenv/config';
import express from "express";
import {dbConnection} from "./config/db";
import packageRoutes from "./routes/package.route"
import deliveryRoutes from "./routes/delivery.route"
import trackerRoutes from "./routes/tracker.route"
import http from "http";
import  WebSocketsService  from "./services/websocket.service" 
import { Server } from "socket.io";
import cors from 'cors';

const app = express()
const port = process.env.NODE_APP_PORT || 3000

// handling CORS 
app.use(cors());

// connect to db
dbConnection()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('trust proxy', true)

/** 
 * default routes
 */

app.get('/', (req, res) => {
  res.send('Go! zmmmm!')
})

app.get('/api/heartbeat', (req, res) => { 
  res.json({ message:`live! ${(new Date).toLocaleDateString()}` }); 
});

/**
 * Package routes
 */
app.use('/api', packageRoutes)

/**
 * delivery routes
 */
app.use('/api', deliveryRoutes)

/**
 * tracker routes
 */
app.use('/api', trackerRoutes)

/** Create HTTP server. */
global.liveUsers = [];
global.liveTrackers = [];
const server = http.createServer(app);
global.io = new Server(server,{
  cors: {
    origin: "*"
  }
});
const webSocketsService = new WebSocketsService();

/** Create socket connection */
global.io.on('connection', (socket) => {
  console.log('a user connected');
  webSocketsService.connection(socket);
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`⚡️ Summoned on port ${port}`)
});