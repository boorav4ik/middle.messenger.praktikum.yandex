import BaseApi from "./BaseApi";
import { SignInData, SignUpData, User } from "./interfaces";

enum AuthApiPaths {
  signin = "/signin",
  signup = "/signup",
  logout = "/logout",
  user = "/user"
}

export default class AuthAPI extends BaseApi {
  constructor() {
    super("/auth");
  }

  signin(data: SignInData) {
    return this.http.post(AuthApiPaths.signin, { data });
  }

  signup(data: SignUpData) {
    return this.http.post(AuthApiPaths.signup, { data });
  }

  logout() {
    return this.http.post(AuthApiPaths.logout);
  }

  user(): Promise<User> {
    return this.http.get(AuthApiPaths.user);
  }
}
