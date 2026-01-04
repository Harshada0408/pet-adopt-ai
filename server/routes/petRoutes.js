const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { addPet } = require("../controllers/petController");

// Add pet (protected)
router.post("/", protect, addPet);

module.exports = router;
