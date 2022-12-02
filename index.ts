import LoginPage from "./src/pages/Login";
import MainPage from "./src/pages/Main";

import ErrorPage from "./src/pages/Error";

function router(path: string) {
  switch (path) {
    case "/":
      return new MainPage();
    case "/login":
      return new LoginPage();
    case "/500":
      return new ErrorPage({
        label: "500",
        title: "Мы уже фиксим",
        footer: "Internal Server Error",
        header: "Мы уже фиксим",
      });
    default:
      return new ErrorPage({
        label: "404",
        title: "Не туда попали",
        footer: "Not Found",
        header: "Не туда попали",
      });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname!;
  const root = document.querySelector("#root")!;
  const Page = router(path);
  root.append(Page.getContent()!);
  Page.dispatchComponentDidMount();
});
