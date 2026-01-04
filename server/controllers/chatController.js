const db = require("../config/db");

// SEND MESSAGE
const sendMessage = (req, res) => {
  const { petId, receiverId, message } = req.body;
  const senderId = req.user.id;

  if (!petId || !receiverId || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO messages (pet_id, sender_id, receiver_id, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [petId, senderId, receiverId, message],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error sending message" });
      }

      res.status(201).json({
        message: "Message sent successfully",
        messageId: result.insertId
      });
    }
  );
};

// GET CHAT HISTORY FOR A PET
const getMessagesByPet = (req, res) => {
  const petId = req.params.petId;

  const query = `
    SELECT messages.*, 
           sender.name AS sender_name,
           receiver.name AS receiver_name
    FROM messages
    JOIN users sender ON messages.sender_id = sender.id
    JOIN users receiver ON messages.receiver_id = receiver.id
    WHERE pet_id = ?
    ORDER BY created_at ASC
  `;

  db.query(query, [petId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching messages" });
    }

    res.status(200).json(results);
  });
};

module.exports = { sendMessage, getMessagesByPet };
