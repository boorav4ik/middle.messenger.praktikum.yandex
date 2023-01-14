import { registerComponent } from "./utils/registerComponent";
import * as components from "./components";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import ChatsPage from "./pages/Chats";
import ProfilePage from "./pages/Profile";
import Router from "./utils/Router";
import "./styles/global.pcss";

// eslint-disable-next-line no-shadow
enum Routes {
  Index = "/",
  SingUp = "/sign-up",
  Settings = "/settings",
  Messenger = "/messenger"
}

window.addEventListener("DOMContentLoaded", async () => {
  Object.values(components).forEach((component) => registerComponent(component));

  const router = new Router("#root");

  router
    .use(Routes.Index, LoginPage)
    .use(Routes.SingUp, RegistrationPage)
    .use(Routes.Messenger, ChatsPage)
    .use(Routes.Settings, ProfilePage)
    .start();
});
