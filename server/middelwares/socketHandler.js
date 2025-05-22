const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

module.exports = function (io) {
    io.on("connection", (socket) => {
        console.log("🔌 Client connected:", socket.id);

        socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`📥 ${socket.id} joined room: ${roomId}`);
        });

        socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
        console.log(`📤 ${socket.id} left room: ${roomId}`);
        });

        socket.on("sendMessage", async ({ conversationId, senderId, content }) => {
        try {
            const message = await Message.create({
            conversationId,
            senderId,
            content,
            });

            await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: {
                content,
                senderId,
                timestamp: message.timestamp,
            },
            });

            io.to(conversationId).emit("receiveMessage", message);
        } catch (err) {
            console.error("⚠️ Socket message error:", err);
        }
        });

        socket.on("disconnect", () => {
        console.log("🔌 Client disconnected:", socket.id);
        });
    });
};
