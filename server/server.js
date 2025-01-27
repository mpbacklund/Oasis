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

console.log("Server running...");

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send a "hello" message to the client
    socket.emit("hello", "world");

    // Listen for the "hello" event from the client
    socket.on("hello", (message) => {
        console.log(`Message from client: ${message}`);
    });
});

httpServer.listen(3000, () => {
    console.log("Listening on port 3000...");
});
