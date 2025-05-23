import axios from "axios"


// Types
export interface Message {
    _id: string;
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: string;
}


export const getMessages = async (conversationId: string): Promise<Message[]> => {
    const response = await axios.get(`http://localhost:5000/messages/${conversationId}`);
    return response.data;
};


export const sendMessage = async (conversationId: string, senderId: string, content: string): Promise<Message> => {
    const response = await axios.post("http://localhost:5000/messages", {
        conversationId,
        senderId,
        content,
    });
    return response.data;
};
