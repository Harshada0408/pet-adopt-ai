// const axios = require("axios");

// const generatePetDescription = async ({
//   name,
//   type,
//   breed,
//   age,
//   reason
// }) => {
//   const prompt = `
// You are an animal adoption assistant.
// Write an emotional and friendly adoption description.

// Pet details:
// Name: ${name}
// Type: ${type}
// Breed: ${breed || "Unknown"}
// Age: ${age || "Unknown"}
// Reason for adoption: ${reason || "Looking for a loving home"}

// Tone: warm, compassionate, encouraging.
// Limit: 3-4 sentences.
// `;

//   try {
//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama3-8b-8192",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Groq AI error:", error.response?.data || error.message);
//     return "A loving pet looking for a forever home.";
//   }
// };

// module.exports = { generatePetDescription };
const axios = require("axios");

const generatePetDescription = async ({ name, type, breed, age, reason }) => {
  // 1. Better Prompt for more detail
  const prompt = `
    You are a professional animal shelter storyteller. 
    Write a heartwarming, detailed, and persuasive adoption story for a pet.
    
    Pet Details:
    - Name: ${name}
    - Type: ${type}
    - Breed: ${breed || "a wonderful mix"}
    - Age: ${age || "Unknown"} years old
    - Reason for needing a home: ${reason}

    Instructions:
    - Start with a catchy, emotional title.
    - Write 3 short, engaging paragraphs.
    - Focus on the pet's personality and the love they have to give.
    - End with a hopeful call to action.
    - Tone: Compassionate and professional.
  `;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8 // Slightly higher for more creative writing
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    // 2. Improved error logging
    console.error("Groq AI error:", error.response?.data || error.message);
    
    // Throwing the error so the Controller knows it failed, 
    // instead of sending a short sentence you don't like.
    throw new Error("AI Generation failed");
  }
};

module.exports = { generatePetDescription };