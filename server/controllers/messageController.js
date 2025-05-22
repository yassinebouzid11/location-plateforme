const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.sendMessage = async (req, res) => {
    const { conversationId, senderId, content } = req.body;

    try {
        const message = await Message.create({
        conversationId,
        senderId,
        content,
        });


        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: "Error sending message" });
    }
    };

    exports.getMessagesByConversation = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: "Error fetching messages" });
    }
};
