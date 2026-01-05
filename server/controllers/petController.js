const db = require("../config/db");

// // ADD PET
// const addPet = (req, res) => {
//   const { name, type, breed, age, description, location } = req.body;

//   // basic validation
//   if (!name || !type) {
//     return res.status(400).json({ message: "Pet name and type are required" });
//   }

//   // owner_id comes from JWT
//   const ownerId = req.user.id;

//   const query = `
//     INSERT INTO pets 
//     (owner_id, name, type, breed, age, description, location)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     query,
//     [ownerId, name, type, breed, age, description, location],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Error adding pet" });
//       }

//       res.status(201).json({
//         message: "Pet listed successfully",
//         petId: result.insertId
//       });
//     }
//   );
// };

const { generatePetDescription } = require("../services/aiService");

// ADD PET (WITH OPTIONAL AI DESCRIPTION)
const addPet = async (req, res) => {
  const {
    name,
    type,
    breed,
    age,
    description,
    location,
    useAI,
    reason
  } = req.body;

  if (!name || !type) {
    return res.status(400).json({
      message: "Pet name and type are required"
    });
  }

  const ownerId = req.user.id;

  let finalDescription = description;

  // If user wants AI-generated description
  if (useAI === true) {
    finalDescription = await generatePetDescription({
      name,
      type,
      breed,
      age,
      reason
    });
  }

  const query = `
    INSERT INTO pets
    (owner_id, name, type, breed, age, description, location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      ownerId,
      name,
      type,
      breed,
      age,
      finalDescription,
      location
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error adding pet"
        });
      }

      res.status(201).json({
        message: "Pet listed successfully",
        petId: result.insertId,
        aiUsed: useAI === true
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

// MARK PET AS ADOPTED (OWNER ONLY)
const markAsAdopted = (req, res) => {
  const petId = req.params.id;
  const userId = req.user.id;

  // check ownership
  const checkQuery = "SELECT * FROM pets WHERE id = ? AND owner_id = ?";

  db.query(checkQuery, [petId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(403).json({
        message: "Not authorized to update this pet"
      });
    }

    // update pet
    const updateQuery = "UPDATE pets SET adopted = true WHERE id = ?";

    db.query(updateQuery, [petId], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating pet" });
      }

      res.status(200).json({
        message: "Pet marked as adopted successfully"
      });
    });
  });
};

module.exports = {
  addPet,
  getAllPets,
  getPetById,
  markAsAdopted
};
