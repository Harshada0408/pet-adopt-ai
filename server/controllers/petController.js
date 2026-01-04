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

// GET ALL PETS (PUBLIC)
const getAllPets = (req, res) => {
  const query = `
    SELECT pets.*, users.name AS owner_name
    FROM pets
    JOIN users ON pets.owner_id = users.id
    WHERE adopted = false
    ORDER BY created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching pets" });
    }

    res.status(200).json(results);
  });
};

// GET SINGLE PET BY ID (PUBLIC)
const getPetById = (req, res) => {
  const petId = req.params.id;

  const query = `
    SELECT pets.*, users.name AS owner_name
    FROM pets
    JOIN users ON pets.owner_id = users.id
    WHERE pets.id = ?
  `;

  db.query(query, [petId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching pet" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json(results[0]);
  });
};

module.exports = { addPet, getAllPets, getPetById };
