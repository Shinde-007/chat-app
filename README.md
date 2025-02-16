# chat-app
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="chat-container">
        <h2>Simple Chat App</h2>

        <!-- Username input -->
        <input type="text" id="username-input" placeholder="Enter your name..." />
        <button id="set-username-btn">Set Name</button>

        <div class="chat-box" id="chat-box"></div>

        <input type="text" id="message-input" placeholder="Type a message..." disabled />
        <button id="send-btn" disabled>Send</button>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script src="script.js"></script>
</body>
</html>


const socket = io();
let username = "";

// Set username when button is clicked
document.getElementById("set-username-btn").addEventListener("click", () => {
    const input = document.getElementById("username-input");
    username = input.value.trim();

    if (username) {
        socket.emit("setUsername", username);
        input.disabled = true;
        document.getElementById("set-username-btn").disabled = true;

        // Enable chat input
        document.getElementById("message-input").disabled = false;
        document.getElementById("send-btn").disabled = false;
    }
});

// Send message
document.getElementById("send-btn").addEventListener("click", () => {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message) {
        socket.emit("chatMessage", message);
        messageInput.value = "";
    }
});

// Receive message
socket.on("chatMessage", (data) => {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("p");

    messageElement.innerHTML = `<strong>${data.sender}:</strong> ${data.message}`;
    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
});


body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
}

.chat-container {
    width: 50%;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.chat-box {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
}

input, button {
    padding: 10px;
    font-size: 16px;
}

button {
    background: blue;
    color: white;
    border: none;
    cursor: pointer;
}
