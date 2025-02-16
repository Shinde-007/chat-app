const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Store username
    socket.on("setUsername", (username) => {
        socket.username = username;
    });

    // Handle chat messages
    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", { sender: socket.username, message: msg });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
