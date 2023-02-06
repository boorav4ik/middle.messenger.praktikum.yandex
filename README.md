# Учебный проект Мессенджер

На основе [макета](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE) с использованием [Hendlebars](https://handlebarsjs.com/) собраны основные страницы:

- Авторизация: login.html
- Регистрация: sigin.html
- Чаты: chats.html
- Настройки: profile.html
- ошибка 404: 404.html
- ошибка 500: 500.html

В качестве сборщика используется [Parcel](https://parceljs.org)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7ce4e61c-536a-41cf-8279-7aa6d4181323/deploy-status)](https://app.netlify.com/sites/magnificent-stroopwafel-546831/deploys)

# Установка

Перед тем как запустить проект, необходимо клонировать данный репозиторий к себе и воспользоваться командой `npm i` для установки зависимостей.

Для запуска используйте команды:

- `npm run build` — собирает проект в статику в папку `./dist`,
- `npm run start` — сначала выполняет команду `npm run build`, а затем поднимает сервер раздающий статику на `localhost:3000`,
- `npm run dev` —  позволяет запустить сервер разработки на `localhost:3000`.

[Демо приложения](https://magnificent-stroopwafel-546831.netlify.app)

---

# Спринт 1 [Pull requests !1](https://github.com/boorav4ik/middle.messenger.praktikum.yandex/pull/1)

- сверстаны страницы при помощи шаблонизатора Handlebars
- добавлен запуск сервера для раздачи статики на 3000 порту

# Спринт 2 [Pull requests !2](https://github.com/boorav4ik/middle.messenger.praktikum.yandex/pull/2)

- добавил TypeScript, а также ESLint, Stylelint, Prettier
- описал сервис событий EventBus
- добавил компонентный подход в проект: Block и EventBus
- cсбор данных из форм и их валидация
- генерация страницы на стороне клиента

#Спринт 3 [Pull requests !2](https://github.com/boorav4ik/middle.messenger.praktikum.yandex/pull/4)

- Добавил роутинг и переделал на SPA
- Досбавил Store
- Внедрите [HTTP API](https://ya-praktikum.tech/api/v2/swagger/#/) чатов, авторизации и пользователей
- Подключите [WebSocket](https://ya-praktikum.tech/api/v2/openapi/ws)
- refactor
