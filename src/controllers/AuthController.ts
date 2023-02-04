import AuthAPI from "../api/AuthApi";
import { SignUpData, SignInDat } from "../api/interfaces";
import Router from "../utils/Router";
import store from "../utils/Store";
import Routes from "../utils/types/Routes";
import MessagesController from "./MessagesController";

class AuthController {
  private readonly api: AuthAPI;

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

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SignInDat) {
    await this.request(async () => {
      await this.api.signin(data);
      await this.getUser();
      Router.go(Routes.Messenger);
    });
  }

  async signup(data: SignUpData) {
    await this.request(async () => {
      await this.api.signup(data);
      await this.getUser();
      Router.go(Routes.Settings);
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
      console.error(error.toSting());
    } finally {
      Router.go(Routes.Index);
    }
  }
}

export default new AuthController();
