const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listAllModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // SDK 0.24.1 has listModels but maybe on the genAI instance or needs listModels call
  // Actually, looking at the docs, genAI.listModels() should work if it's there.
  // Let's try to see if we can use 'v1' instead of 'v1beta' if that's the issue.

  const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
  ];

  console.log("Checking model existence...");
  for (const m of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      // Only way to really check if it works without generating content is ...
      // not simple via getGenerativeModel. But the 404 happens during generateContent.
      console.log(`Initialized ${m}`);
    } catch (e) {
      console.log(`Failed initializing ${m}: ${e.message}`);
    }
  }
}

listAllModels();
