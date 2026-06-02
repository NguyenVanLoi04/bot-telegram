/**
 * Dịch vụ chọn ngẫu nhiên thành viên trong team (Vòng quay nhân phẩm)
 */

// Danh sách username Telegram của các thành viên trong team.
// LƯU Ý: Phải có chữ @ ở trước. Nếu ai không có username, có thể dùng tên thường (nhưng không tag được).
const teamMembers = [
  "@phat_2k4",
  "@krissbui",
  "@doankhietthanh",
  "@thanhloi19",
  "@khangdao0311",
  "@trung_trinh_teso",
  "@NguyenVanLoi_04"
];

// Các kịch bản hình phạt / giải thưởng
const scenarios = [
  "trúng ô 💸 NHÀ TÀI TRỢ VÀNG: Bao trà sữa cả team chiều nay! 🧋 (Không bao làm 🐶 nhé)",
  "trúng ô 🤡 NGHIỆP QUẬT: Phải viết bổ sung Unit Test cho toàn bộ code vừa viết tuần này!",
  "nhận được đặc quyền 👑 HOÀNG ĐẾ: Được quyền chỉ định 1 người bất kỳ đi rót nước/mua cafe cho mình!",
  "trúng giải 🕵️‍♂️ THÁNH SOI: Phải nhận trách nhiệm Review TẤT CẢ Pull Request của team trong hôm nay!",
  "quay vào ô 🌸 MÙA XUÂN: Bị ép đổi màu nền VS Code/WebStorm sang màu Hồng Cánh Sen (Pink) trong suốt 1 tiếng!",
  "trúng án phạt 🎤 IDOL GIỚI TRẺ: Phải gửi 1 đoạn voice hát 1 câu bất kỳ vào group, nếu không Bug sẽ bám theo 3 tháng!",
  "nhận được 💌 TÌNH YÊU: Phải thả thính 1 đồng nghiệp trong group bằng các thuật ngữ Code (VD: 'Em là biến const của lòng anh...').",
  "trúng giải 🐸 CHÚA TỂ MEME: Phải đổi Avatar Telegram thành 1 cái meme bựa nhất trong 24h!",
  "trúng ô 🚑 CẤP CỨU: Được miễn đi ăn trưa để... ở lại fix bug (Đùa thôi, chúc mừng bạn qua ải)! 😮‍💨",
  "đã nhận được đặc quyền: Được phép chê code của Sếp một câu công khai mà không sợ bị đì! 🦸‍♂️"
];

/**
 * Lấy ngẫu nhiên 1 thành viên
 */
function getRandomMember() {
  const randomIndex = Math.floor(Math.random() * teamMembers.length);
  return teamMembers[randomIndex];
}

/**
 * Lấy ngẫu nhiên 1 hình phạt
 */
function getRandomScenario() {
  const randomIndex = Math.floor(Math.random() * scenarios.length);
  return scenarios[randomIndex];
}

module.exports = {
  teamMembers,
  getRandomMember,
  getRandomScenario
};
