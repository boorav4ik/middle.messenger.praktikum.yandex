// import { HomePage } from "./pages/Home";
import MainPage from "./src/pages/Main";
import NotFoundPage from "./src/pages/NotFound";
import ServerErrorPage from "./src/pages/ServerError";

function router(path: string) {
  switch (path) {
    case "/":
      return new MainPage();
    case "/500":
      return new ServerErrorPage();
    default:
      return new NotFoundPage();
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  console.log({path});

  const root = document.querySelector("#root")!;
  const Page = router(path);

  root.append(Page.getContent()!);
  Page.dispatchComponentDidMount();
});
