console.log("Script starting...");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function runTest() {
  console.log("runTest beginning...");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("Testing gemini-1.5-flash...");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("Success with gemini-1.5-flash");
  } catch (e) {
    console.log("Failed gemini-1.5-flash:", e.message);

    console.log("Testing gemini-1.5-flash-latest...");
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });
      const result = await model.generateContent("Hi");
      console.log("Success with gemini-1.5-flash-latest");
    } catch (e2) {
      console.log("Failed gemini-1.5-flash-latest:", e2.message);

      console.log("Testing gemini-pro...");
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-pro");
      } catch (e3) {
        console.log("Failed gemini-pro:", e3.message);
      }
    }
  }
  console.log("runTest done.");
}

runTest()
  .then(() => console.log("Final success"))
  .catch((e) => console.log("Final error", e));
