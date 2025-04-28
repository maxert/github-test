# GitHub CRM

Веб-додаток для управління вашими репозиторіями GitHub

---

## 📦 Стек технологій

- **Frontend**: Next.js + TypeScript + Material UI
- **Backend**: Express.js + TypeScript + TypeORM
- **База даних**: PostgreSQL
- **Контейнери**: Docker + Docker Compose
- **CI/CD**: GitHub Actions

---

## 🚀 Швидкий старт розробки

### 1. Клонувати репозиторій
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Створити `.env` файли

**Кореневий `.env`:**
```dotenv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=yourdb
```

**backend/.env:**
```dotenv
PORT=4000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=yourdb
JWT_SECRET=your_jwt_secret
GITHUB_API_URL=https://api.github.com
```

**frontend/.env:**
```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NODE_ENV=development
```

---

## 🐳 Запуск через Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api
- PostgreSQL: порт 5432

Щоб зупинити:
```bash
docker compose down
```

---

## ⚙️ Скрипти

| Команда              | Опис                                     |
|----------------------|------------------------------------------|
| `npm run dev`         | Запуск локального сервера (frontend або backend) |
| `npm run build`       | Збірка проекту                         |
| `npm run lint`        | Лінтинг коду (ESLint + Prettier)        |
| `npm run format`      | Форматування коду Prettier              |

---

## ✅ CI/CD через GitHub Actions

Автоматично:

- Створюються `.env` файли.
- Запускаються контейнери Docker (`backend`, `frontend`, `db`).
- Перевіряється здоров'я бази даних PostgreSQL.
- Виконується лінтинг фронтенду та бекенду.
- Якщо все успішно — збираються образи для деплою.

**Проблеми вирішуються в CI:**
- Ліміти GitHub API обробляються через fallback на ручний ввід репозиторію.
- Кешування пошукових запитів на фронтенді для мінімізації викликів.

---

## 📚 API Документація

### 🔐 Аутентифікація

| Метод | Шлях                  | Опис                  |
|-------|------------------------|------------------------|
| POST  | `/api/auth/register`    | Реєстрація користувача |
| POST  | `/api/auth/login`       | Логін                  |
| POST  | `/api/auth/logout`      | Вихід                  |
| GET   | `/api/auth/profile`     | Отримати профіль       |

---

### 📂 Проекти

| Метод | Шлях                   | Опис                              |
|-------|-------------------------|-----------------------------------|
| POST  | `/api/projects`          | Додати новий репозиторій          |
| GET   | `/api/projects`          | Отримати всі свої проекти         |
| PATCH | `/api/projects/:id`      | Оновити дані проекту              |
| DELETE| `/api/projects/:id`      | Видалити проект                   |

---

### 🔎 Пошук репозиторіїв

| Метод | Шлях                             | Опис                                   |
|-------|-----------------------------------|----------------------------------------|
| GET   | `/api/search/repositories?q=term`| Пошук репозиторіїв на GitHub з автозаповненням |

**Обмеження:**
Без GitHub токена — лише **60 запитів на годину**.

Якщо перевищено ліміт — з'являється повідомлення, а користувач вводить назву репозиторію вручну.

---

## 🖼️ Функціонал фронтенду

- Пошук репозиторіїв за назвою з GitHub (autocomplete + кешування).
- Додавання проекту в особистий кабінет.
- Оновлення статистики (stars, forks, issues) по кожному проекту.
- Видалення проектів.
- Авторизація через JWT токени (cookie-based).

---

## 🔥 Посилання на репозиторій тестового завдання
https://github.com/ivz-dev/FullStack-Test-Task

