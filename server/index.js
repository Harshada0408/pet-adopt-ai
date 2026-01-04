require("dotenv").config();   // ✅ FIRST – load env vars

const express = require("express");
const cors = require("cors");

const db = require("./config/db");  // ✅ AFTER dotenv

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Pet Adoption Backend is running 🚀");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
