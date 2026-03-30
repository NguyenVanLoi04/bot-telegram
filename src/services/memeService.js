const axios = require("axios");

async function fetchRandomMeme() {
  try {
    const response = await axios.get("https://meme-api.com/gimme");
    return response.data;
  } catch (error) {
    console.error("Meme error:", error.message);
    throw new Error("Không lấy được meme rồi bro, thử lại sau nhé!");
  }
}

module.exports = {
  fetchRandomMeme,
};
