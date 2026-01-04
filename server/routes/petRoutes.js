// const express = require("express");
// const router = express.Router();

// const protect = require("../middleware/authMiddleware");
// const { addPet } = require("../controllers/petController");

// // Add pet (protected)
// router.post("/", protect, addPet);

// module.exports = router;
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  addPet,
  getAllPets,
  getPetById,
  markAsAdopted
} = require("../controllers/petController");

// public routes
router.get("/", getAllPets);
router.get("/:id", getPetById);

// protected route
router.post("/", protect, addPet);
// mark pet as adopted (owner only)
router.put("/:id/adopt", protect, markAsAdopted);

module.exports = router;
