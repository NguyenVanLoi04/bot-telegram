const schedule = require("node-schedule");
const config = require("../config/botConfig");

function initSchedules(bot) {
  const { chatGroupId } = config;
  const timezone = "Asia/Ho_Chi_Minh";

  // Nhắc nhở nghỉ ngơi - Sáng
  schedule.scheduleJob({ rule: "25 10 * * 1-5", tz: timezone }, () => {
    bot.sendMessage(
      chatGroupId,
      "🚶‍♂️ *ĐẾN GIỜ NGHỈ NGƠI RỒI BRO!* \n\nĐứng dậy đi dạo và vươn vai nào! Đừng ngồi một chỗ lâu quá nhé. ✨",
      { parse_mode: "Markdown" },
    );
  });

  // Nhắc nhở nghỉ ngơi - Chiều
  schedule.scheduleJob({ rule: "25 15 * * 1-5", tz: timezone }, () => {
    bot.sendMessage(
      chatGroupId,
      "🌅 *ĐÃ 15:25 RỒI!*\n\nMời các quý vị đại biểu của quốc hội *Teso* đứng dậy và _relax_ sau nữa ngày Vite code vất vả. 🧘‍♂️✨",
      { parse_mode: "Markdown" },
    );
  });

  // Nhắc nhở report
  schedule.scheduleJob({ rule: "45 17 * * 1-5", tz: timezone }, () => {
    const dateStr = new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      timeZone: timezone,
    }).format(new Date());

    const reportTemplate = `⏰ *17:45 RỒI! BÁC TÔ LÂM VÀ BÁC PHẠM MINH CHÍNH KÊU GỌI REPORT!* ⏰\n\nDạ anh @congteso em gửi report ạ! 🙏✨\n\n📊 *Báo cáo tiến độ Event no code* (${dateStr})\n\n1️⃣ *Ticket*\n+ \n\n2️⃣ *Công việc đã làm*\n+ \n\n3️⃣ *Công việc cần làm*\n+ \n\n4️⃣ *Tự đánh giá tiến độ*\n+ dev : \n\n─────────────────────────────`;

    bot.sendMessage(chatGroupId, reportTemplate, { parse_mode: "Markdown" });
  });

  // Nhắc nhở log work
  schedule.scheduleJob({ rule: "00 18 * * 1-5", tz: timezone }, () => {
    const reportTemplate =
      "🌅 *ĐÃ 18:00 RỒI!*\n\nMời các người anh em *log work* \n\n📝 *Cấu trúc:* `worklog: Xh - Nội dung công việc` \n\nThân ái ❤️";
    bot.sendMessage(chatGroupId, reportTemplate, { parse_mode: "Markdown" });
  });

  // Nhắc nhở uống nước (2h một lần từ 9h-17h)
  schedule.scheduleJob({ rule: "0 0 9-17/2 * * 1-5", tz: timezone }, () => {
    bot.sendMessage(
      chatGroupId,
      "💧 *NHẮC NHỞ UỐNG NƯỚC!* 💧\n\nĐã 2 tiếng trôi qua rồi, các quý vị đại biểu quốc hội *Teso* đừng quên bổ sung nước để thanh lọc cơ thể và giữ tỉnh táo nhé! 🥤✨\n\n_Uống nước đi bro!_",
      { parse_mode: "Markdown" },
    );
  });

  console.log("Schedules initialized");
}

module.exports = {
  initSchedules,
};
