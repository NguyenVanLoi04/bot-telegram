const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
const chatGroupId = process.env.CHAT_GROUP_ID;

const bot = new TelegramBot(token, { polling: true });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Chào mừng ${msg.from.first_name}! Bot nhắc nhở đã sẵn sàng.\nSử dụng /cauhoi [câu hỏi] để hỏi bot bất cứ điều gì!`,
  );
});

// Xử lý lệnh /cauhoi
bot.onText(/\/cauhoi (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const question = match[1];

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
    `Em là  Bot của thằng Lợi devlor xin lỗi vì đã làm phiền.`,
  );
});

schedule.scheduleJob({ rule: "30 10 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  bot.sendMessage(
    chatGroupId,
    "🚶‍♂️ Đến giờ đứng dậy đi dạo và vươn vai rồi bro! Đừng ngồi lâu quá.\n Đã đến giờ nghỉ ngơi rồi bro ơi!",
  );
});

schedule.scheduleJob({ rule: "30 15 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  bot.sendMessage(
    chatGroupId,
    "🌅 Đã 15:30 rồi! Đứng dậy làm một tách trà hoặc cà phê, và vươn vai cho tỉnh táo nào bro.",
  );
});

schedule.scheduleJob({ rule: "45 17 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  const dateStr = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());

  const reportTemplate = `⏰ 17:45 rồi! Bác Tô Lâm và Bác Phạm Minh Chính kêu gọi report!


Dạ anh @congteso em gửi report ạ


Báo cáo tiến độ Event no code (${dateStr})

1. Ticket
+

2. Công việc đã làm
+

3. Công việc cần làm
+

4. Tự đánh giá tiến độ
+ dev :

————————————————————————————-`;

  bot.sendMessage(chatGroupId, reportTemplate);
});

schedule.scheduleJob({ rule: "00 18 * * 1-5", tz: "Asia/Ho_Chi_Minh" }, () => {
  const reportTemplate =
    "🌅 Đã 6 giờ rồi! Mời các người anh em log work \n\n Cấu trúc : worklog: Xh - Nội dung công việc \n\n Thân ái ❤️";

  bot.sendMessage(chatGroupId, reportTemplate);
});
