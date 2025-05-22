// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const {
    sendMessage,
    getMessagesByConversation,
} = require("../controllers/messageController");

router.post("/", sendMessage);
router.get("/:conversationId", getMessagesByConversation);

module.exports = router;
