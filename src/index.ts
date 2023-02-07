import { registerComponent } from "./utils/registerComponent";
import * as components from "./components";
import { LoginPage } from "./pages/Login";
import { RegistrationPage } from "./pages/Registration";
import { ChatsPage } from "./pages/Chats";
import { ProfilePage } from "./pages/Profile";
import { router } from "./utils/Router";
import { Routes } from "./utils/types/Routes";
import { controller } from "./controllers/AuthController";
import { Block } from "./utils/Block";
import "./styles/global.pcss";

window.addEventListener("DOMContentLoaded", async () => {
  Object.values(components).forEach((component) => registerComponent(component as typeof Block));

  let isProtected = true;

  router
    .use(Routes.Index, LoginPage as typeof Block)
    .use(Routes.SingUp, RegistrationPage as typeof Block)
    .use(Routes.Messenger, ChatsPage as typeof Block)
    .use(Routes.Settings, ProfilePage as typeof Block);

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SingUp:
      isProtected = false;
      break;
    default:
      break;
  }

  try {
    await controller.getUser();
    router.start();
    if (!isProtected) {
      router.go(Routes.Messenger);
    }
  } catch (error) {
    router.start();
    if (isProtected) {
      router.go(Routes.Index);
    }
  }
});
