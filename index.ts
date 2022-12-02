import MainPage from "./src/pages/Main";
import ErrorPage from "./src/pages/Error";
import FormPage from "./src/pages/Form";

const loginFormPageProps = {
  name: "login",
  title: "Вход",
  fields: [
    { plaseholder: "Логин", name: "login", type: "text", required: true },
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

function router(path: string) {
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

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname!;
  const root = document.querySelector("#root")!;
  const Page = router(path);
  root.append(Page.getContent()!);
  Page.dispatchComponentDidMount();
});
