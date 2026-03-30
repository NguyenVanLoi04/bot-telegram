const TelegramBot = require("node-telegram-bot-api");
const config = require("./config/botConfig");
const aiService = require("./services/aiService");
const memeService = require("./services/memeService");
const { initSchedules } = require("./services/scheduleService");
const actionService = require("./services/actionService");
const cooldownService = require("./services/cooldownService");

const bot = new TelegramBot(config.token, { polling: true });

// ---------------- Lệnh cơ bản ----------------
bot.onText(/\/menu/, (msg) => {
  if (!cooldownService.isAllowed(bot, msg)) return;
  bot.sendMessage(
    msg.chat.id,
    `👋 *Chào mừng ${msg.from.first_name}!*\n\nBot nhắc nhở đã sẵn sàng. 🚀\nBạn có thể chọn nhanh chức năng bên dưới nhé!`,
    {
      parse_mode: "Markdown",
      ...actionService.keyboards.mainMenu,
    },
  );
});

bot.onText(/\/templateSendCommit$/, (msg) => {
  if (!cooldownService.isAllowed(bot, msg)) return;
  const template = `
🚀 *THÔNG BÁO GỬI COMMIT* 🚀

Dạ anh @congteso em gửi commit ..... ạ! 🙏✨

💻 *Link commit:* 
🎫 *Link ticket:* 

───────────────────────────
_Chúc một ngày làm việc hiệu quả!_ 🔥💪`;
  bot.sendMessage(msg.chat.id, template, { parse_mode: "Markdown" });
});

bot.onText(/\/xinloidalamphien/, (msg) => {
  if (!cooldownService.isAllowed(bot, msg)) return;
  bot.sendMessage(
    config.chatGroupId,
    "🤖 Em là *Bot của thằng Lợi devlor*, xin lỗi vì đã làm phiền mọi người ạ! 🙏✨",
    { parse_mode: "Markdown" },
  );
});

// ---------------- Lệnh AI ----------------
bot.onText(/\/cauhoi (.+)/, async (msg, match) => {
  if (!cooldownService.isAllowed(bot, msg, config.aiCooldownTime)) return;
  const chatId = msg.chat.id;
  const question = match[1];

  // Gửi thông báo đang tìm kiếm
  const waitMsg = await bot.sendMessage(
    chatId,
    "🤖 *Đang tìm kiếm câu trả lời, đợi em xíu nhé...* ⏳",
    { parse_mode: "Markdown" },
  );

  try {
    const response = await aiService.askGemini(question);
    // Cập nhật lại tin nhắn chờ bằng câu trả lời (giới hạn độ dài nếu cần)
    await bot.editMessageText(`🤖 ${response}`, {
      chat_id: chatId,
      message_id: waitMsg.message_id,
    });
  } catch (error) {
    await bot.editMessageText(`❌ ${error.message}`, {
      chat_id: chatId,
      message_id: waitMsg.message_id,
    });
  }
});

bot.onText(/\/cauhoi$/, (msg) => {
  if (!cooldownService.isAllowed(bot, msg)) return;
  bot.sendMessage(
    msg.chat.id,
    "Vui lòng nhập câu hỏi sau lệnh /cauhoi. Ví dụ: /cauhoi Hôm nay thời tiết thế nào?",
  );
});

// ---------------- Lệnh Meme ----------------
bot.onText(/\/meme/, async (msg) => {
  if (!cooldownService.isAllowed(bot, msg)) return;
  const chatId = msg.chat.id;

  try {
    const meme = await memeService.fetchRandomMeme();
    bot.sendPhoto(chatId, meme.url, {
      caption: `🔥 Đã đến giờ giải trí rồi các quý vị đại biểu quốc hội Teso ơi! 🧘‍♂️✨`,
      parse_mode: "Markdown",
    });
  } catch (error) {
    bot.sendMessage(chatId, `❌ ${error.message}`);
  }
});

// ---------------- Lắng nghe các Hành động (Nút bấm) ----------------
bot.on("callback_query", (query) => {
  if (!cooldownService.isAllowed(bot, query)) return;
  actionService.handleAction(bot, query);
});

// ---------------- Khởi động Schedule ----------------
initSchedules(bot);

console.log("Bot đã chạy và schedules đã được khởi tạo.");
