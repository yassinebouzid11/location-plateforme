const Conversation = require("../models/Conversation");
const User = require("../models/User");

exports.findOrCreateConversation = async (req, res) => {
    const { user1, user2 } = req.body;

    try {
        let conversation = await Conversation.findOne({
        $or: [
            { user1, user2 },
            { user1: user2, user2: user1 },
        ],
        });

        if (!conversation) {
        conversation = await Conversation.create({ user1, user2 });
        }

        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({ error: "Error finding or creating conversation" });
    }
    };

    exports.getUserConversations = async (req, res) => {
        const {userId} = req.params;

        try {
            const conversations = await Conversation.find({
            $or: [{ user1: userId }, { user2: userId }],
            }).sort({ updatedAt: -1 });

            const results = await Promise.all(
                conversations.map(async (conv) => {
                    const otherUserId = conv.user1 === userId ? conv.user2 : conv.user1;
                    const otherUser = await User.findById(otherUserId).select("nom");
                    console.log("otherUser data : "+otherUser);
                    return {
                    _id: conv._id,
                    otherUser: otherUser ? { _id: otherUser._id, nom: otherUser.nom } : null,
                    };
                })
        );

        res.status(200).json(results);
        } catch (err) {
            res.status(500).json({ error: "Error fetching conversations" });
        }
};
