const axios = require("axios");
const config = require("../config/botConfig");

// map command → keyword
const chillMap = {
  default: ["sunset", "sunset beach", "sunset sky"],
  rain: ["rain", "rain window", "rain city night"],
  night: ["night sky", "moon", "city night lights"],
};

// random phần tử
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// lấy ảnh từ Unsplash
async function getImage(query) {
  try {
    const res = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query,
        client_id: config.unsplashKey,
      },
    });
    return res.data.urls.regular;
  } catch (error) {
    console.error("Unsplash error:", error.message);
    throw new Error("Không lấy được ảnh chill rồi 😢");
  }
}

// caption chill
function getCaption(type) {
  const captions = {
    default: [
      "🌇 Chill tí đi bro...",
      "☁️ Ngắm hoàng hôn cho nhẹ đầu",
      "🌿 Không cần vội, trời vẫn đẹp mà",
    ],
    rain: [
      "🌧️ Nghe mưa rơi, lòng nhẹ lại...",
      "🎧 Mưa + nhạc = chill hết nấc",
      "☁️ Một ngày mưa yên bình",
    ],
    night: [
      "🌙 Đêm xuống rồi, chill thôi",
      "✨ Thành phố lên đèn đẹp ghê",
      "🌌 Nhìn trời đêm một chút...",
    ],
  };

  return randomItem(captions[type] || captions.default);
}

module.exports = {
  chillMap,
  randomItem,
  getImage,
  getCaption,
};
