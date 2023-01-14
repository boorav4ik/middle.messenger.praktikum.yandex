import AuthAPI from "../api/AuthApi";
import { SignUpData, SingInData } from "../api/interfaces";
import Router from "../utils/Router";
import Routes from "../utils/types/Routes";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: SingInData) {
    try {
      await this.api.signin(data);
      Router.go(Routes.Settings);
    } catch (error) {
      alert("SignIn Error");
    }
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
    try {
      await this.api.logout();
      Router.go(Routes.Index);
    } catch (error) {
      alert("Logout Error");
    }
  }
}
