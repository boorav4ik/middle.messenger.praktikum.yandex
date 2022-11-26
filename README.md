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

# Установка

Перед тем как запустить проект, необходимо клонировать данный репозиторий к себе и воспользоваться командой `npm i` для установки зависимостей.

Для запуска используйте команды:

- `npm run build` — собирает проект в статику в папку `./dist`,
- `npm run start` — сначала выполняет команду `npm run build`, а затем поднимает сервер раздающий статику на `localhost:3000`,
- `npm run dev` —  позволяет запустить сервер разработки на `localhost:1234`.

[Демо приложения](https://magnificent-stroopwafel-546831.netlify.app)

---

# Спринт 1 [Pull requests !1](https://github.com/boorav4ik/middle.messenger.praktikum.yandex/pull/1)

- сверстаны страницы при помощи шаблонизатора Handlebars
- добавлен запуск сервера для раздачи статики на 3000 порту

# Спринт 2

- добавил ESLint, Prettier и TypeScript
- описал сервис событий EventBus
