const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
{
    user1: { type: String, required: true },
    user2: { type: String, required: true },
},
{ timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
