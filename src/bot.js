const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
require("dotenv").config();

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
const chatGroupId = process.env.CHAT_GROUP_ID;

const bot = new TelegramBot(token, { polling: true });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cấu hình cooldown (chống spam)
const cooldowns = new Map();
const COOLDOWN_TIME = 5000; // 5 giây cooldown giữa các lần gọi lệnh

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 *Chào mừng ${msg.from.first_name}!*\n\nBot nhắc nhở đã sẵn sàng. 🚀\nSử dụng lệnh \`/cauhoi [câu hỏi]\` để trò chuyện cùng AI nhé!`,
    { parse_mode: "Markdown" },
  );
});

// Xử lý lệnh /cauhoi
bot.onText(/\/cauhoi (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const question = match[1];

  // Kiểm tra cooldown
  const now = Date.now();
  if (cooldowns.has(userId) && now - cooldowns.get(userId) < COOLDOWN_TIME) {
    const remaining = Math.ceil(
      (COOLDOWN_TIME - (now - cooldowns.get(userId))) / 1000,
    );
    return bot.sendMessage(
      chatId,
      `🤖 *Bro bình tĩnh!* Vui lòng đợi ${remaining}s nữa rồi hãy hỏi tiếp nhé.`,
      { parse_mode: "Markdown" },
    );
  }
  cooldowns.set(userId, now);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(question);
    const response = result.response.text();
    bot.sendMessage(chatId, `🤖 ${response}`);
  } catch (error) {
    console.error("Gemini error:", error.message);
    bot.sendMessage(chatId, "❌ Có lỗi xảy ra khi gọi AI. Vui lòng thử lại!");
  }
});

// Xử lý trường hợp chỉ gõ /cauhoi mà không có câu hỏi
bot.onText(/\/cauhoi$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Vui lòng nhập câu hỏi sau lệnh /cauhoi. Ví dụ: /cauhoi Hôm nay thời tiết thế nào?",
  );
});

bot.onText(/\/templateSendCommit$/, (msg) => {
  const template = `
🚀 *THÔNG BÁO GỬI COMMIT* 🚀

Dạ anh @congteso em gửi commit ..... ạ! 🙏✨

💻 *Link commit:* 
🎫 *Link ticket:* 

───────────────────────────
_Chúc một ngày làm việc hiệu quả!_ 🔥💪`;
  bot.sendMessage(msg.chat.id, template, { parse_mode: "Markdown" });
});

console.log("Bot đã chạy");

bot.onText(/\/xinloidalamphien/, (msg) => {
  console.log("running");
  console.log("Bot đã chạy here");
  bot.sendMessage(
    chatGroupId,
    "🤖 Em là *Bot của thằng Lợi devlor*, xin lỗi vì đã làm phiền mọi người ạ! 🙏✨",
    { parse_mode: "Markdown" },
  );
});

// Lệnh /meme để lấy meme ngẫu nhiên
bot.onText(/\/meme/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Kiểm tra cooldown
  const now = Date.now();
  if (cooldowns.has(userId) && now - cooldowns.get(userId) < COOLDOWN_TIME) {
    const remaining = Math.ceil(
      (COOLDOWN_TIME - (now - cooldowns.get(userId))) / 1000,
    );
    return bot.sendMessage(
      chatId,
      `⏳ *Chầm chậm thôi bro!* Đợi ${remaining}s nữa để xem meme tiếp nhé.`,
      { parse_mode: "Markdown" },
    );
  }
  cooldowns.set(userId, now);

  try {
    const response = await axios.get("https://meme-api.com/gimme");
    const { url, title, author, postLink } = response.data;

    bot.sendPhoto(chatId, url, {
      caption: `🔥 Đã đến giờ giải trí rồi các quý vị đại biểu quốc hội Teso ơi! 🧘‍♂️✨`,
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error("Meme error:", error.message);
    bot.sendMessage(chatId, "❌ Không lấy được meme rồi bro, thử lại sau nhé!");
  }
});

schedule.scheduleJob({ rule: "25 10 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  bot.sendMessage(
    chatGroupId,
    "🚶‍♂️ *ĐẾN GIỜ NGHỈ NGƠI RỒI BRO!* \n\nĐứng dậy đi dạo và vươn vai nào! Đừng ngồi một chỗ lâu quá nhé. ✨",
    { parse_mode: "Markdown" },
  );
});

schedule.scheduleJob({ rule: "25 15 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  bot.sendMessage(
    chatGroupId,
    "🌅 *ĐÃ 15:25 RỒI!*\n\nMời các quý vị đại biểu của quốc hội *Teso* đứng dậy và _relax_ sau nữa ngày Vite code vất vả. 🧘‍♂️✨",
    { parse_mode: "Markdown" },
  );
});

schedule.scheduleJob({ rule: "45 17 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  const dateStr = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());

  const reportTemplate = `⏰ *17:45 RỒI! BÁC TÔ LÂM VÀ BÁC PHẠM MINH CHÍNH KÊU GỌI REPORT!* ⏰

Dạ anh @congteso em gửi report ạ! 🙏✨

📊 *Báo cáo tiến độ Event no code* (${dateStr})

1️⃣ *Ticket*
+ 

2️⃣ *Công việc đã làm*
+ 

3️⃣ *Công việc cần làm*
+ 

4️⃣ *Tự đánh giá tiến độ*
+ dev : 

─────────────────────────────`;

  bot.sendMessage(chatGroupId, reportTemplate, { parse_mode: "Markdown" });
});

schedule.scheduleJob({ rule: "00 18 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  const reportTemplate =
    "🌅 *ĐÃ 18:00 RỒI!*\n\nMời các người anh em *log work* \n\n📝 *Cấu trúc:* `worklog: Xh - Nội dung công việc` \n\nThân ái ❤️";

  bot.sendMessage(chatGroupId, reportTemplate, { parse_mode: "Markdown" });
});

schedule.scheduleJob(
  { rule: "0 0 9-17/2 * * 1-5", tz: "Asia/Ho_Chi_Minh" },
  () => {
    bot.sendMessage(
      chatGroupId,
      "💧 *NHẮC NHỞ UỐNG NƯỚC!* 💧\n\nĐã 2 tiếng trôi qua rồi, các quý vị đại biểu quốc hội *Teso* đừng quên bổ sung nước để thanh lọc cơ thể và giữ tỉnh táo nhé! 🥤✨\n\n_Uống nước đi bro!_",
      { parse_mode: "Markdown" },
    );
  },
);
