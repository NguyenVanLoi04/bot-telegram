const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
require("dotenv").config();

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
const chatGroupId = process.env.CHAT_GROUP_ID;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Chào mừng ${msg.from.first_name}! Bot nhắc nhở đã sẵn sàng.`,
  );
});

bot.onText(/\/xinloidalamphien/, (msg) => {
  bot.sendMessage(
    chatGroupId,
    `Em là  Bot của thằng Lợi devlor xin lỗi vì đã làm phiền.`,
  );
});

schedule.scheduleJob("30 10 * * 1-5", () => {
  bot.sendMessage(
    chatGroupId,
    "🚶‍♂️ Đến giờ đứng dậy đi dạo và vươn vai rồi bro! Đừng ngồi lâu quá.\n Đã đến giờ nghỉ ngơi rồi bro ơi!",
  );
});

schedule.scheduleJob("30 15 * * 1-5", () => {
  bot.sendMessage(
    chatGroupId,
    "🌅 Đã 15:30 rồi! Đứng dậy làm một tách trà hoặc cà phê, và vươn vai cho tỉnh táo nào bro.",
  );
});

schedule.scheduleJob("45 17 * * 1-5", () => {
  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}`;

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

schedule.scheduleJob("00 18 * * 1-5", () => {
  const reportTemplate =
    "🌅 Đã 6 giờ rồi! Mời các người anh em log work \n\n Cấu trúc : worklog: Xh - Nội dung công việc \n\n Thân ái ❤️";

  bot.sendMessage(chatGroupId, reportTemplate);
});
