import AuthAPI from "../api/AuthApi";
import { SignUpData, SingInData } from "../api/interfaces";
import Router from "../utils/Router";
import store from "../utils/Store";
import Routes from "../utils/types/Routes";

async function request(req: () => Promise<void>): Promise<void> {
  store.set("user.isLoading", true);
  try {
    await req();
    store.set("user.error", undefined);
  } catch (error) {
    store.set("user.error", error);
  } finally {
    store.set("user.isLoading", false);
  }
}

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SingInData) {
    await request(async () => {
      await this.api.signin(data);
      Router.go(Routes.Settings);
    });
  }

  async signup(data: SignUpData) {
    try {
      await this.api.signup(data);
      await this.getUser();
      Router.go(Routes.Settings);
    } catch (error) {
      alert("SignUp Error");
    }
  }

  async getUser() {
    try {
      const response = this.api.user();
      console.log("user:", await response);
    } catch (error) {
      alert("Get User Error");
    }
  }

  async logout() {
    await request(async () => {
      await this.api.logout();
      Router.go(Routes.Index);
    });
  }
}

export default new AuthController();
