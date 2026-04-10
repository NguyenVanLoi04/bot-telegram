const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config/botConfig");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

async function askGemini(question) {
  try {
    // Khuyên dùng: Đổi sang phiên bản 2.5 Flash đang mở Free Tier
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        "Bạn là một trợ lý Telegram. Hãy trả lời câu hỏi ngắn gọn, súc tích. Sử dụng các thẻ HTML cơ bản của Telegram như <b>, <i>, <code> nếu cần thiết. TUYỆT ĐỐI KHÔNG dùng Markdown.",
    });
    const result = await model.generateContent(question);
    let responseText = result.response.text();

    // Giới hạn 4000 ký tự để tránh lỗi Telegram API
    if (responseText.length > 4000) {
      responseText = responseText.substring(0, 4000) + "...";
    }

    return responseText;
  } catch (error) {
    console.error("Gemini error:", error.message);
    throw new Error("Có lỗi xảy ra khi gọi AI. Vui lòng thử lại!");
  }
}

module.exports = {
  askGemini,
};
