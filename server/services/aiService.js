const axios = require("axios");

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

const generatePetDescription = async ({ name, type, breed, age, reason }) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional animal shelter copywriter. You write emotional, heart-touching, and persuasive adoption descriptions that help pets find homes. Use a warm and hopeful tone."
        },
        {
          role: "user",
          content: `Write a detailed 3-paragraph adoption description for a pet with these details:
          - Name: ${name}
          - Type: ${type}
          - Breed: ${breed}
          - Age: ${age} years old
          - Reason for adoption: ${reason}
          
          Include a catchy title at the top, describe the pet's personality based on their breed, and explain why they need a new loving family. End with a call to action.`
        }
      ],
      model: "llama3-8b-8192", // Using a high-quality model
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq AI Error:", error);
    throw new Error("Failed to generate description");
  }
};
module.exports = { generatePetDescription };
