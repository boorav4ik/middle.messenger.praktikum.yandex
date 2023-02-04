import { registerComponent } from "./utils/registerComponent";
import * as components from "./components";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import ChatsPage from "./pages/Chats";
import ProfilePage from "./pages/Profile";
import Router from "./utils/Router";
import Routes from "./utils/types/Routes";
import "./styles/global.pcss";
import AuthController from "./controllers/AuthController";

window.addEventListener("DOMContentLoaded", async () => {
  Object.values(components).forEach((component) => registerComponent(component));

  let isProtected = true;

  Router.use(Routes.Index, LoginPage)
    .use(Routes.SingUp, RegistrationPage)
    .use(Routes.Messenger, ChatsPage)
    .use(Routes.Settings, ProfilePage);

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SingUp:
      isProtected = false;
      break;
    default:
      break;
  }

  try {
    await AuthController.getUser();
    Router.start();
    if (!isProtected) {
      Router.go(Routes.Messenger);
    }
  } catch (error) {
    Router.start();
    if (isProtected) {
      Router.go(Routes.Index);
    }
  }
});
