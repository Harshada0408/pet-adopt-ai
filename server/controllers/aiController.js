// const { generatePetDescription } = require("../services/aiService");

// // GENERATE PET DESCRIPTION
// const generateDescription = async (req, res) => {
//   const { name, type, breed, age, reason } = req.body;

//   if (!name || !type) {
//     return res.status(400).json({
//       message: "Pet name and type are required"
//     });
//   }

//   try {
//     const description = await generatePetDescription({
//       name,
//       type,
//       breed,
//       age,
//       reason
//     });

//     res.status(200).json({
//       description
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "AI generation failed"
//     });
//   }
// };

// module.exports = { generateDescription };

const { generatePetDescription } = require("../services/aiService");

// GENERATE PET DESCRIPTION
const generateDescription = async (req, res) => {
  const { name, type, breed, age, reason } = req.body;

  if (!name || !type) {
    return res.status(400).json({
      message: "Pet name and type are required"
    });
  }

  try {
    const description = await generatePetDescription({
      name,
      type,
      breed,
      age,
      reason
    });

    res.status(200).json({
      description
    });
  } catch (error) {
    res.status(500).json({
      message: "AI generation failed"
    });
  }
};

module.exports = { generateDescription };
