require("dotenv").config();   // ✅ 1. Load env vars first

const express = require("express");
const cors = require("cors");
const db = require("./config/db");  // ✅ 2. Database connection

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); // Allows us to read JSON from Axios/Thunder Client

// --- ROUTES ---

// 1. Authentication (Signup/Login)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// 2. Test Routes (To check JWT)
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// 3. Pet Routes (Add, Get, Update pets)
const petRoutes = require("./routes/petRoutes");
app.use("/api/pets", petRoutes);

// 4. Chat Routes (Messages)
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

// 6. AI Routes (Generate Descriptions)
const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);


// 5. Basic Health Check
app.get("/", (req, res) => {
  res.send("Pet Adoption Backend is running 🚀");
});



// --- START SERVER ---
// ✅ ALWAYS at the very bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});