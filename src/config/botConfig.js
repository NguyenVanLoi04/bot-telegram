require("dotenv").config();

module.exports = {
  token: process.env.TOKEN,
  chatId: process.env.CHAT_ID,
  chatGroupId: process.env.CHAT_GROUP_ID,
  geminiApiKey: process.env.GEMINI_API_KEY,
  cooldownTime: 7000, // 7 giây (mặc định cho các lệnh khác)
  aiCooldownTime: 25000, // 25 giây (dành riêng cho AI để tránh tốn token)
};
