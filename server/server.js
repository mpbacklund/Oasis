import * as dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer} from 'http';
import express from 'express';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const rooms = new Map(); // Only track room metadata

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.emit("connected");

    socket.on("createRoom", (game, players) => {
        console.log(game);

        let roomCode = "";

        // create a unique room code
        do {
            roomCode = generateRoomCode();
        } while (rooms.has(roomCode));

        // join the room
        rooms.set(roomCode, {game, maxPlayers: players, host: socket.id});
        socket.join(roomCode);

        console.log(`${socket.id} created room ${roomCode}`)

        io.to(roomCode).emit("roomCreated", roomCode);
    });

    socket.on("joinRoom", (roomCode, playerName) => {
        // check if the room exists
        if (!rooms.has(roomCode)) {
            console.log("room does not exist")
            socket.emit("error", "Room does not exist.");
            return;
        }

        // check if room has space
        const roomSockets = io.sockets.adapter.rooms.get(roomCode) || new Set();
        if (roomSockets.size >= rooms.get(roomCode).maxPlayers) {
            socket.emit("error", "Room is full.");
            console.log("room is full");
            return;
        }

        console.log(`${socket.id}, name ${playerName}, attempting to join ${roomCode}`)

        socket.join(roomCode);

        io.to(roomCode).emit("playerJoined", socket.id, playerName, rooms.get(roomCode).game);
    });

    // basically when one person sends a message to the room, we broadcast it to everyone
    socket.on("roomMessage", (roomCode, data) => {
        console.log(data);
        io.to(roomCode).emit("roomMessage", data);
    });

    socket.on("kickPlayer", (playerID, roomCode) => {
        const targetSocket = io.sockets.sockets.get(playerID);
        if (targetSocket) {
            console.log(`Kicking player: ${playerID}`);
            targetSocket.leave(roomCode); // Remove from room
            targetSocket.emit("kicked"); // Notify the player
            targetSocket.disconnect(true); // Force disconnect
        }
    });
});

if (!process.env.PORT) {
    throw new Error("PORT is not defined in .env file");
}
httpServer.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});

// function to create a random room code
function generateRoomCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      code += letters[randomIndex];
    }
  
    return code;
}