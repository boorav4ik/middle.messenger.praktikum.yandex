# Учебный проект Мэседжер

На основе [макета](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link) с использованием [Hendlebars](https://handlebarsjs.com/) собраны основные страницы:

- Авторизация: login.html
- Регистрация: sigin.html
- Чаты: chats.html
- Настройки: profile.html
- ошибка 404: 404.html
- ошибка 500: 500.html

В качестве сборщика используется [Parcel](https://parceljs.org)

![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
## Установка
Перед тем как запустить проект, небходимо клонировать данный репозиторий к себе и воспользоваться командой `npm i` для установки зависимостей.

Для запуска используйте команды:
- `npm run build` — собирает проект в статику в папку `./dist`,
- `npm run start` — сначала выполняет команду `npm run build`, а затем поднимает сервер раздающий статику на `localhost:3000`,
- `npm run dev` —  позволяет запустить сервер разработки на `localhost:1234`.
