// src/hooks/useSocketMessages.ts
import { useEffect } from "react";
import socket from "../socket";
import { Message } from "../apiMessages/messageApi";

type Callback = (message: Message) => void;

export const useSocketMessages = (
    conversationId: string,
    onMessageReceived: Callback
    ) => {
    useEffect(() => {
        if (!conversationId) return;

        socket.emit("joinRoom", conversationId);

        const handleMessage = (message: Message) => {
        if (message.conversationId === conversationId) {
            onMessageReceived(message);
        }
        };

        socket.on("receiveMessage", handleMessage);

        return () => {
        socket.emit("leaveRoom", conversationId);
        socket.off("receiveMessage", handleMessage);
        };
    }, [conversationId, onMessageReceived]);
};
