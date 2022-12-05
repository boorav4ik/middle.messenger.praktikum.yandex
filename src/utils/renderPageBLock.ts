import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import FormPage from "../pages/FormPage";
import ChatsPage from "../pages/ChatsPage";
import ProfilePage from "../pages/ProfilePage";

const loginFormPageProps = {
  name: "login",
  title: "Вход",
  fields: [
    { plaseholder: "Логин", name: "login", type: "text", required: true },
    {
      plaseholder: "Пароль",
      name: "password",
      type: "password",
      required: true,
    },
  ],
  actions: [
    {
      label: "Авторизоваться",
      onClick() {
        location.replace("/chats");
      },
    },
    {
      label: "Нет аккаунта?",
      onClick() {
        location.replace("/sigin");
      },
    },
  ],
};

const siginFormPageProps = {
  name: "sigin",
  title: "Регистрация",
  fields: [
    { name: "email", type: "email", plaseholder: "Почта" },
    { name: "login", type: "text", plaseholder: "Логин" },
    { name: "first_name", type: "text", plaseholder: "Имя", required: false },
    { name: "second_name", type: "text", plaseholder: "Фамилия" },
    { name: "phone", type: "tel", plaseholder: "Телефон" },
    { name: "password", type: "password", plaseholder: "Пароль" },
    {
      name: "password-again",
      type: "password",
      plaseholder: "Пароль (ещё раз)",
    },
  ],
  actions: [
    {
      label: "Зарегистрироваться",
      onClick() {
        location.replace("/chats");
      },
    },
  ],
};

const internalServerErrorPageProps = {
  label: "500",
  title: "Мы уже фиксим",
  footer: "Internal Server Error",
  header: "Мы уже фиксим",
};

const notFoundErrorPageProps = {
  label: "404",
  title: "Не туда попали",
  footer: "Not Found",
  header: "Не туда попали",
};

function routePage(path: string) {
  switch (path) {
    case "/":
      return new MainPage();
    case "/login":
      return new FormPage(loginFormPageProps);
    case "/sigin":
      return new FormPage(siginFormPageProps);
    case "/chats":
      return new ChatsPage();
    case "/profile":
      return new ProfilePage();
    case "/500":
      return new ErrorPage(internalServerErrorPageProps);
    default:
      return new ErrorPage(notFoundErrorPageProps);
  }
}
export default function Router() {
  const root = document.querySelector("#root")!;

  return function (path: string) {
    root.innerHTML = "";
    const page = routePage(path);
    root.append(page.getContent() as Node);
    page.dispatchComponentDidMount();
  };
}
