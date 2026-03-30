const config = require("../config/botConfig");

// Map lưu trữ thời điểm cuối cùng user tương tác: userId -> timestamp
const lastInteractions = new Map();

/**
 * Kiểm tra xem người dùng có đang spam hay không?
 * @param {number} userId - ID của người dùng Telegram
 * @param {number} customCooldown - (Tùy chọn) Thời gian chờ mong muốn
 * @returns {number} - 0 nếù không spam, ngược lại trả về số giây còn lại chờ đợi
 */
function checkSpam(userId, customCooldown) {
  const currentCooldown = customCooldown || config.cooldownTime;
  const now = Date.now();
  const lastTime = lastInteractions.get(userId) || 0;
  const diff = now - lastTime;

  if (diff < currentCooldown) {
    return Math.ceil((currentCooldown - diff) / 1000);
  }

  // Cập nhật thời điểm tương tác mới nhất
  lastInteractions.set(userId, now);
  return 0;
}

/**
 * Helper để kiểm tra spam cho cả tin nhắn và nút bấm một cách nhanh chóng
 * @param {object} bot - instance của bot telegram
 * @param {object} msgOrQuery - Message của bot hoặc CallbackQuery
 * @param {number} customCooldown - (Tùy chọn) Thời gian chờ mong muốn
 * @returns {boolean} - true nếu hợp lệ, false nếu bị spam (và tự gửi thông báo)
 */
function isAllowed(bot, msgOrQuery, customCooldown) {
  // Lấy ra thông tin context linh hoạt từ Message hoặc CallbackQuery
  const userId = msgOrQuery.from.id;
  const chatId = msgOrQuery.chat
    ? msgOrQuery.chat.id
    : msgOrQuery.message.chat.id;

  const remaining = checkSpam(userId, customCooldown);
  if (remaining > 0) {
    bot.sendMessage(
      chatId,
      `⏳ *Chầm chậm thôi bro!* Vui lòng chờ ${remaining}s nữa để tiếp tục trò chuyện nhé.`,
      { parse_mode: "Markdown" },
    );
    return false;
  }
  return true;
}

module.exports = {
  checkSpam,
  isAllowed,
};
