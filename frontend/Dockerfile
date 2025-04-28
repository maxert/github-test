# Билд-стейдж: только для сборки проекта
FROM node:20 AS builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Строим Next.js приложение
RUN npm run build

# Production-стейдж: чистый и лёгкий образ
FROM node:20

WORKDIR /app

# Копируем только нужные файлы из builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Устанавливаем только production зависимости
RUN npm install --omit=dev

# Устанавливаем переменные окружения
ENV NODE_ENV production
ENV PORT 3000

# Порт который слушает контейнер
EXPOSE 3000

# Запускаем сервер Next.js
CMD ["npm", "start"]
