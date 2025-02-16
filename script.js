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
