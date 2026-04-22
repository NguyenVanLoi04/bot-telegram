const schedule = require("node-schedule");
const config = require("../config/botConfig");
const memeService = require("./memeService");

function initSchedules(bot) {
  const { chatGroupId } = config;
  const timezone = "Asia/Ho_Chi_Minh";

  // Nhắc nhở nghỉ ngơi - Sáng
  schedule.scheduleJob({ rule: "20 10 * * 1-5", tz: timezone }, () => {
    const message = `
🧘‍♂️ *MORNING RECHARGE — 10:20*
────────────────────────
Cảnh báo! Bug "Thoát vị đĩa đệm" đang tìm cách merge vào cột sống của bạn. ⚠️

Đứng dậy vươn vai để *Refactor* lại cơ thể ngay và luôn bro!

✨ *Code có thể sai, nhưng cột sống phải thẳng!* 🦴
    `.trim();
    bot.sendMessage(chatGroupId, message, { parse_mode: "Markdown" });
  });

  // Nhắc nhở nghỉ ngơi - Sáng
  schedule.scheduleJob({ rule: "25 10 * * 1-5", tz: timezone }, () => {
    const message = `
☕ *MORNING RECHARGE — 10:25*
────────────────────────
Data cho thấy ngồi im quá lâu sẽ biến bạn thành một cái 'Cột Điện' biết code. 🔋

Đứng lên đi lấy nước hoặc làm vài động tác *Flex* cho đỡ mỏi đi nào!

🚀 *Sức khỏe là Node_Modules, không có nó thì app nghỉ chạy!* 🛠️
    `.trim();
    bot.sendMessage(chatGroupId, message, { parse_mode: "Markdown" });
  });

  // Nhắc nhở nghỉ ngơi - Chiều
  schedule.scheduleJob({ rule: "20 15 * * 1-5", tz: timezone }, async () => {
    const message = `
🌅 *BREAK TIME — 15:20*
────────────────────────
Mời các thường dân của *Teso* đứng dậy và _cứu lấy thế giới_ (50k) của bản thân!

⚖️ *Giá trị tương đương:*
• 1 buổi trưa thịnh soạn
• 1 ly trà chanh sảng khoái

🧘‍♂️ *Đứng dậy và thư giãn ngay nào!* ✨
    `.trim();

    bot.sendMessage(chatGroupId, message, { parse_mode: "Markdown" });

    // Gửi kèm một meme hài hước
    try {
      const meme = await memeService.fetchRandomMeme("ProgrammerHumor");
      bot.sendPhoto(chatGroupId, meme.url, {
        caption: "Giải trí tí cho đỡ căng thẳng nè! 😂",
      });
    } catch (e) {
      console.error("Failed to send meme in schedule:", e.message);
    }
  });

  // Nhắc nhở nghỉ ngơi - Chiều
  schedule.scheduleJob({ rule: "25 15 * * 1-5", tz: timezone }, () => {
    const message = `
🔔 *BREAK TIME — 15:25*
────────────────────────
Mời các quý vị đại biểu của quốc hội *Teso* đứng dậy và _relax_ sau nửa ngày "Vite code" vất vả. 🏛️

Ghế nóng quá rồi, đứng dậy đi dạo vài vòng cho hạ nhiệt đi các bro!

🧘‍♂️ *Đứng dậy ngay nào, deadline vẫn chờ nhưng cột sống thì không!* ✨
    `.trim();

    bot.sendMessage(chatGroupId, message, { parse_mode: "Markdown" });
  });

  // Nhắc nhở report
  schedule.scheduleJob({ rule: "45 17 * * 1-5", tz: timezone }, () => {
    const dateStr = new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      timeZone: timezone,
    }).format(new Date());

    const message = `
⏰ *DAILY REPORT — 17:45*
────────────────────────
Bác Tô Lâm và bác Phạm Minh Chính kêu gọi report! 🫡

Dạ anh @congteso em gửi report ạ! 🙏✨

📊 *BÁO CÁO TIẾN ĐỘ EVENT NO CODE* (${dateStr})

1️⃣ *Ticket*
+ 

2️⃣ *Công việc đã làm*
+ 

3️⃣ *Công việc cần làm*
+ 

4️⃣ *Tự đánh giá tiến độ*
+ Dev: 

────────────────────────
    `.trim();

    bot.sendMessage(chatGroupId, message, { parse_mode: "Markdown" });
  });

  // Nhắc nhở log work
  schedule.scheduleJob({ rule: "00 18 * * 1-5", tz: timezone }, () => {
    const message = `
🌆 *END OF DAY — 18:00*
────────────────────────
Mời các người anh em *log work* để kết thúc ngày làm việc hiệu quả!

📝 *Cấu trúc:* \`worklog: Xh - Nội dung công việc\`

Thân ái ❤️
    `.trim();
    bot.sendMessage(chatGroupId, message, { parse_mode: "Markdown" });
  });

  // Nhắc nhở uống nước (2h một lần từ 9h-17h)
  schedule.scheduleJob({ rule: "0 0 9-17/2 * * 1-5", tz: timezone }, () => {
    const message = `
💧 *HYDRATION REMINDER*
────────────────────────
Đã 2 tiếng trôi qua rồi! Các quý vị đại biểu quốc hội *Teso* đừng quên bổ sung nước để thanh lọc cơ thể và giữ tỉnh táo nhé.

🥤 *Uống nước đi bro!* ✨
    `.trim();
    bot.sendMessage(chatGroupId, message, { parse_mode: "Markdown" });
  });

  console.log("Schedules initialized");
}

module.exports = {
  initSchedules,
};
