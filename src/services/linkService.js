/**
 * Quản lý các Link nội bộ của team (Figma, Swagger, API, Tài liệu...)
 */

// Danh sách các link nội bộ thường dùng
const internalLinks = [
  {
    text: "🎨 Figma Thiết kế",
    url: "https://www.figma.com/files/project/your-project-id", // Cập nhật link thực tế
  },
  {
    text: "📝 API Swagger (Dev)",
    url: "https://api-dev.yourdomain.com/swagger",
  },
  {
    text: "🌐 Web Staging",
    url: "https://staging.yourdomain.com",
  },
  {
    text: "📚 Jira / Trello",
    url: "https://yourteam.atlassian.net",
  },
];

/**
 * Trả về cấu trúc Inline Keyboard chứa các link này cho Telegram Bot
 */
function getLinksKeyboard() {
  // Telegram Inline Keyboard hỗ trợ hiển thị URL trực tiếp
  // Mỗi row chứa 1 nút để hiển thị đẹp hơn
  const inline_keyboard = internalLinks.map((link) => {
    return [
      {
        text: link.text,
        url: link.url,
      },
    ];
  });

  return {
    reply_markup: {
      inline_keyboard: inline_keyboard,
    },
  };
}

module.exports = {
  internalLinks,
  getLinksKeyboard,
};
