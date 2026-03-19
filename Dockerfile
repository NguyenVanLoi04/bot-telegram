# FROM node:20-alpine
# -- Chọn base image Node.js phiên bản 20 chạy trên Alpine Linux (siêu nhẹ, tối ưu cho server).
# -- Đây là môi trường có sẵn Node để chạy code của bạn.

FROM node:20-alpine

# WORKDIR /app
# -- Tạo thư mục /app trong container và chuyển vào đó.
# -- Mọi lệnh sau này sẽ chạy bên trong /app.
WORKDIR /app

# COPY package*.json ./
# -- Copy các file package.json và package-lock.json vào thư mục /app.
# -- Làm bước này trước để Docker tận dụng cache khi cài dependency.
COPY package*.json ./

# RUN npm install --production
# -- Cài đặt dependencies cần cho runtime.
# -- Không cài devDependencies → giúp image nhẹ hơn.
RUN npm install --production

# COPY . .
# -- Copy toàn bộ source code vào /app (trừ các file ignore trong .dockerignore).
COPY . .

# CMD ["node", "bot.js"]
# -- Lệnh cuối cùng để chạy app khi container khởi động.
# -- Ở đây chạy Node + file bot.js.
CMD ["node", "src/bot.js"]
