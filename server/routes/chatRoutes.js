const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { sendMessage, getMessagesByPet } = require("../controllers/chatController");

// send message
router.post("/", protect, sendMessage);

// get chat history for a pet
router.get("/:petId", protect, getMessagesByPet);

module.exports = router;
