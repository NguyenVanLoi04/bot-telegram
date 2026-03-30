const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config/botConfig");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

async function askGemini(question) {
  try {
    // Khuyên dùng: Đổi sang phiên bản 2.5 Flash đang mở Free Tier
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(question);
    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error.message);
    throw new Error("Có lỗi xảy ra khi gọi AI. Vui lòng thử lại!");
  }
}

module.exports = {
  askGemini,
};
