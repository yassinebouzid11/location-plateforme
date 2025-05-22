// routes/conversationRoutes.js
const express = require("express");
const router = express.Router();
const {
    findOrCreateConversation,
    getUserConversations,
} = require("../controllers/conversationController");

router.post("/", findOrCreateConversation);
router.get("/:userId", getUserConversations);

module.exports = router;
