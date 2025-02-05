const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

const rooms = new Map(); // Only track room metadata


console.log("Server running...");

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

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
            socket.emit("error", "Room does not exist.");
            return;
        }

        // check if room has space
        const roomSockets = io.sockets.adapter.rooms.get(roomCode) || new Set();
        if (roomSockets.size >= rooms.get(roomCode).maxPlayers) {
            socket.emit("error", "Room is full.");
            return;
        }

        socket.join(roomCode);

        io.to(roomNumber).emit("playerJoined", (socket.id, playerName));
    });
});

httpServer.listen(3000, () => {
    console.log("Listening on port 3000...");
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