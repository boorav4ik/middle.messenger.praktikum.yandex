import avatar from "../images/defaultImage.png";

export default {
  email: {
    type: "email",
    label: "Почта",
    value: "pochta@yandex.ru",
    validation: "email"
  },
  login: {
    type: "text",
    label: "Логин",
    value: "admin",
    validation: "login"
  },
  first_name: {
    type: "text",
    label: "Имя",
    value: "Иван",
    validation: "name"
  },
  second_name: {
    type: "text",
    label: "Фамилия",
    value: "Иванов",
    validation: "name"
  },
  display_name: {
    type: "text",
    label: "Имя в чате",
    value: "Игорь Николаев",
    validation: "name"
  },
  phone: {
    type: "phone",
    label: "Телефон",
    value: "+7 (800) 100 50 00",
    validation: "phone"
  },
  avatar
};
