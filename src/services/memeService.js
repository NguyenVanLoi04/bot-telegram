const axios = require("axios");

async function fetchRandomMeme(subreddit = "") {
  try {
    const url = subreddit
      ? `https://meme-api.com/gimme/${subreddit}`
      : "https://meme-api.com/gimme";
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Meme error:", error.message);
    throw new Error("Không lấy được meme rồi bro, thử lại sau nhé!");
  }
}

module.exports = {
  fetchRandomMeme,
};
