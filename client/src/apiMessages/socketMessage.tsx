import socket from "../socket";

interface SendMessagePayload {
    conversationId: string;
    senderId: string;
    content: string;
}

export const sendSocketMessage = (payload: SendMessagePayload) => {
    socket.emit("sendMessage", payload);
};
