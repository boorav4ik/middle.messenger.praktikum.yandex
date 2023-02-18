import { api } from "../api/UserApi";
import { store } from "../utils/Store";

class UserController {
  private readonly api = api;

  public async uploadAvatar(data: FormData) {
    try {
      const user = await this.api.changeAvatar(data);
      store.set("user", user);
    } catch (e) {
      console.error(e);
    }
  }
}

export const controller = new UserController();
