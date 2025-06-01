# Таблица с React и TypeScript

## Описание проекта

Простое приложение на React с TypeScript для отображения и управления таблицей данных, использующее `@tanstack/react-table` для рендеринга таблицы и `json-server` для mock-API.

## Инструкция по запуску через Docker

1. Убедитесь, что у вас установлены **Docker**.

2. Запустите проект с помощью Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. После запуска:

   - Приложение будет доступно на `http://localhost:8080`.
   - `json-server` будет доступен на `http://localhost:3000/previews`.

   Для остановки используйте:

   ```bash
   docker-compose down
   ```

## Инструкция по запуску через npm

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите клиент и сервер в разных терминалах, используя доступные скрипты (см. [Доступные скрипты](#доступные-скрипты)):
   - Для клиента:
     ```bash
     npm run dev
     ```
   - Для `json-server`:
     ```bash
     npm run start-server
     ```
3. После запуска:
   - Приложение будет доступно на `http://localhost:8080`.
   - `json-server` будет доступен на `http://localhost:3000/previews`.

## Доступные скрипты

В файле `package.json` определены следующие скрипты:

- `dev` — Запускает Vite в режиме разработки на порту 8080 с поддержкой Hot Module Replacement (HMR).
  ```bash
  npm run dev
  ```
- `start-server` — Запускает `json-server`, который обслуживает данные из `db.json5` на порту 3000.
  ```bash
  npm run start-server
  ```
- `build` — Собирает проект для продакшена (сначала компилирует TypeScript, затем выполняет сборку Vite).
  ```bash
  npm run build
  ```
- `lint` — Запускает ESLint для проверки кода на ошибки и соответствие стилю.
  ```bash
  npm run lint
  ```
- `preview` — Запускает предварительный просмотр собранного приложения через Vite.
  ```bash
  npm run preview
  ```
