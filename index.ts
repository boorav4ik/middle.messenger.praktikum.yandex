// import { HomePage } from "./pages/Home";
import MainPage from "./src/pages/Main";
import NotFoundPage from "./src/pages/NotFound";

function router(path: string) {
  console.log({ path });

  switch (path) {
    case "/":
      return new MainPage();
    default:
      return new NotFoundPage();
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const root = document.querySelector("#root")!;
  const Page = router(path);

  root.append(Page.getContent()!);
  Page.dispatchComponentDidMount();
  // switch (path) {
  //   case "/":
  //     const main = new MainPage();
  //     root.append(main.getContent()!);
  //     main.dispatchComponentDidMount();
  //     break;
  //   default:
  //     const app = new NotFoundPage();
  //     root.append(app.getContent()!);
  //     app.dispatchComponentDidMount();
  //     break;
  // }
});
