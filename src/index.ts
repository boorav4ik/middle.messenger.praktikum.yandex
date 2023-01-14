import { registerComponent } from "./utils/registerComponent";
import * as components from "./components";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import ChatsPage from "./pages/Chats";
import ProfilePage from "./pages/Profile";
import Router from "./utils/Router";
import Routes from "./utils/types/Routes";
import "./styles/global.pcss";

window.addEventListener("DOMContentLoaded", async () => {
  Object.values(components).forEach((component) => registerComponent(component));

  Router.use(Routes.Index, LoginPage)
    .use(Routes.SingUp, RegistrationPage)
    .use(Routes.Messenger, ChatsPage)
    .use(Routes.Settings, ProfilePage)
    .start();
});
