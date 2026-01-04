const db = require("../config/db");

// ADD PET
const addPet = (req, res) => {
  const { name, type, breed, age, description, location } = req.body;

  // basic validation
  if (!name || !type) {
    return res.status(400).json({ message: "Pet name and type are required" });
  }

  // owner_id comes from JWT
  const ownerId = req.user.id;

  const query = `
    INSERT INTO pets 
    (owner_id, name, type, breed, age, description, location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [ownerId, name, type, breed, age, description, location],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error adding pet" });
      }

      res.status(201).json({
        message: "Pet listed successfully",
        petId: result.insertId
      });
    }
  );
};

module.exports = { addPet };
