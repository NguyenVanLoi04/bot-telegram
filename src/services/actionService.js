const aiService = require("./aiService");
const memeService = require("./memeService");

// Các mẫu Keyboard cho Bot
const keyboards = {
  mainMenu: {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🎭 Xem Meme", callback_data: "action_meme" },
          { text: "🤖 Hỏi Gemini", callback_data: "action_ai" },
        ],
        [
          { text: "🚀 Commit Template", callback_data: "action_template" },
          { text: "🙏 Xin lỗi vì phiền", callback_data: "action_xinloi" },
        ],
        [{ text: "🌌 Chill Lofi 🌃", callback_data: "action_lofi" }],
      ],
    },
  },
};

/**
 * Hàm xử lý tập trung cho các nút bấm (callback_query)
 */
async function handleAction(bot, callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  // Lấy ra user để bot phản hồi riêng tư nếu cần
  const userId = callbackQuery.from.id;
  const username = callbackQuery.from.first_name;

  try {
    switch (data) {
      case "action_meme":
        await bot.sendMessage(chatId, `⏳ Đang lấy meme cho ${username}...`);
        const meme = await memeService.fetchRandomMeme();
        await bot.sendPhoto(chatId, meme.url, {
          caption: `🔥 Giải trí thôi anh em ơi!`,
        });
        break;

      case "action_ai":
        await bot.sendMessage(
          chatId,
          "🤖 Để hỏi AI, vui lòng dùng lệnh: `/cauhoi [Nội dung]`",
          { parse_mode: "Markdown" },
        );
        break;

      case "action_template":
        const template = `
🚀 *THÔNG BÁO GỬI COMMIT* 🚀
Dạ anh @congteso em gửi commit ..... ạ! 🙏✨
💻 *Link commit:* 
🎫 *Link ticket:* 
───────────────────────────`;
        await bot.sendMessage(chatId, template, { parse_mode: "Markdown" });
        break;

      case "action_lofi":
        await bot.sendMessage(
          chatId,
          "🌃 Đang lấy một chút ảnh chill cho bạn... 🎶",
        );
        await bot.sendPhoto(
          chatId,
          "https://loremflickr.com/800/600/lofi,night,city",
          {
            caption: "🎶 Thả lỏng một chút nhé! ✨",
          },
        );
        break;

      case "action_xinloi":
        await bot.sendMessage(
          chatId,
          "🤖 Dạ em là bot của thằng Lợi, xin lỗi vì đã làm phiền ạ! 🙏✨",
        );
        break;

      default:
        await bot.sendMessage(chatId, "⚠️ Hành động không hợp lệ.");
        break;
    }
  } catch (error) {
    console.error("Action error:", error);
    await bot.sendMessage(chatId, "❌ Có lỗi xảy ra: " + error.message);
  } finally {
    // Luôn luôn gọi answerCallbackQuery để kết thúc quá trình nhấn nút
    bot.answerCallbackQuery(callbackQuery.id);
  }
}

module.exports = {
  keyboards,
  handleAction,
};
