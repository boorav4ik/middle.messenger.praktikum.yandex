import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import FormPage from "../pages/FormPage";
import Block from "./Block";

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
