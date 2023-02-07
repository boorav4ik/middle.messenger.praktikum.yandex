import { api } from "../api/AuthApi";
import { SignUpData, SignInData } from "../api/interfaces";
import { router } from "../utils/Router";
import { store } from "../utils/Store";
import { Routes } from "../utils/types/Routes";
import { controller as MessagesController } from "./MessagesController";

class AuthController {
  private readonly api = api;

  private readonly storeKey = "user";

  async request(req: () => Promise<void>): Promise<void> {
    store.set(`${this.storeKey}.isLoading`, true);
    try {
      await req();
      store.set(`${this.storeKey}.error`, undefined);
    } catch (error) {
      store.set(`${this.storeKey}.error`, error);
    } finally {
      store.set(`${this.storeKey}.isLoading`, false);
    }
  }

  async signin(data: SignInData) {
    await this.request(async () => {
      await this.api.signin(data);
      await this.getUser();
      router.go(Routes.Messenger);
    });
  }

  async signup(data: SignUpData) {
    await this.request(async () => {
      await this.api.signup(data);
      await this.getUser();
      router.go(Routes.Settings);
    });
  }

  async getUser() {
    store.set(this.storeKey, await this.api.user());
  }

  async logout() {
    MessagesController.closeAll();
    try {
      await this.api.logout();
    } catch (error) {
      console.error(error);
    } finally {
      router.go(Routes.Index);
    }
  }
}

export const controller = new AuthController();
