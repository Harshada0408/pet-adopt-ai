const bcrypt = require("bcrypt");
const db = require("../config/db");

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check if user already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // insert user
      const insertQuery =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(
        insertQuery,
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Error creating user" });
          }

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const jwt = require("jsonwebtoken");

// LOGIN USER
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });
  });
};


module.exports = { registerUser, loginUser };

