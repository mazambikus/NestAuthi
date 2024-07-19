# Проект Nest.js с Prisma и PostgreSQL

## Описание

Этот проект представляет собой веб-приложение, построенное с использованием Nest.js и Prisma. Оно включает в себя систему аутентификации и авторизации с использованием JWT, а также CRUD операции для пользователей и записей. Проект использует PostgreSQL в качестве базы данных.

## Структура проекта

Проект организован следующим образом:

- `prisma/` — Модуль Prisma и схема базы данных.
    - `prisma.module.ts` — Модуль Prisma.
    - `prisma.service.ts` — Сервис Prisma для взаимодействия с базой данных.
    - `schema.prisma` — Схема базы данных Prisma.

- `src/`
    - `app.module.ts` — Главный модуль приложения.
    - `main.ts` — Точка входа в приложение.

    - `auth/` — Модуль аутентификации и авторизации.
        - `auth.controller.ts` — Контроллер для обработки запросов аутентификации.
        - `auth.module.ts` — Модуль аутентификации.
        - `auth.service.ts` — Сервис для обработки логики аутентификации.
        - `authenticated-request.interface.ts` — Интерфейс для аутентифицированного запроса.
        - `jwt.strategy.ts` — Стратегия для JWT.
        - `jwt-auth.guard.ts` — Guard для проверки JWT.
        - `local.strategy.ts` — Локальная стратегия аутентификации.
        - `local-auth.guard.ts` — Guard для локальной аутентификации.
        - `roles.decorator.ts` — Декоратор для ролей.
        - `roles.guard.ts` — Guard для проверки ролей.

    - `posts/` — Модуль для работы с записями.
        - `posts.controller.ts` — Контроллер для обработки запросов записей.
        - `posts.module.ts` — Модуль записей.
        - `posts.service.ts` — Сервис для обработки логики записей.
        - `dto/` — Папка с Data Transfer Object (DTO) для записей.
            - `create-post.dto.ts` — DTO для создания записи.
            - `update-post.dto.ts` — DTO для обновления записи.
        - `entities/` — Папка с сущностями записей.
            - `post.entity.ts` — Сущность записи.

    - `users/` — Модуль для работы с пользователями.
        - `users.controller.ts` — Контроллер для обработки запросов пользователей.
        - `users.module.ts` — Модуль пользователей.
        - `users.service.ts` — Сервис для обработки логики пользователей.
        - `dto/` — Папка с DTO для пользователей.
            - `create-user.dto.ts` — DTO для создания пользователя.
            - `update-user.dto.ts` — DTO для обновления пользователя.
        - `entities/` — Папка с сущностями пользователей.
            - `user.entity.ts` — Сущность пользователя.

- `test/` — Папка с тестами.

- `.env` — Файл с переменными окружения.

- `.gitignore` — Файл для игнорирования файлов в Git.

- `jest.config.js` — Конфигурация Jest для тестирования.

- `jest-e2e.json` — Конфигурация Jest для end-to-end тестов.

- `NestAuth.iml` — Файл конфигурации IDE (например, IntelliJ IDEA).

- `package.json` — Файл зависимостей и скриптов проекта.

- `package-lock.json` — Файл блокировки зависимостей.

- `Procfile` — Файл для развертывания приложения на Heroku.

- `README.md` — Этот файл.

- `tsconfig.build.json` — Конфигурация TypeScript для сборки проекта.

- `tsconfig.json` — Основная конфигурация TypeScript.

- `tsconfig.test.json` — Конфигурация TypeScript для тестирования.

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone <URL>
2. Перейдите в каталог проекта:
   ```bash
   cd <project-directory>
3. Установите зависимости:
   ```bash
   npm install
4. Создайте файл .env на основе .env.example и укажите параметры подключения к базе данных и другие переменные окружения.
5. Выполните миграции базы данных:
   ```bash
   npx prisma migrate dev
6. Запустите сервер:
   ```bash
   npm run start
   


# Документация API
## Пользователи
- 'POST /auth/register' — Регистрация нового пользователя.
- POST /auth/login — Вход в систему, получение JWT.
- GET /users — Получение списка пользователей (доступно только для админов).
- GET /users/:id — Получение профиля пользователя по ID (доступно для админов и самого пользователя).
- PUT /users/:id — Обновление профиля пользователя (доступно для админов и самого пользователя).
- DELETE /users/:id — Удаление пользователя (доступно для админов и самого пользователя).
## Записи
- POST /posts — Создание новой записи (доступно для аутентифицированных пользователей).
- GET /posts — Получение списка записей (доступно всем пользователям).
- GET /posts/:id — Получение записи по ID (доступно всем пользователям).
- PUT /posts/:id — Обновление записи (доступно для автора записи).
- DELETE /posts/:id — Удаление записи (доступно для админов и автора записи).
