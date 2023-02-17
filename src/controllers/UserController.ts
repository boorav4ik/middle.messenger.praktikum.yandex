import { api } from "../api/UserApi";
import { store } from "../utils/Store";

class UserController {
  private readonly api = api;

  public async uploadAvatar(data: FormData) {
    try {
      store.set("user.avatar", (await this.api.changeAvatar(data)).avatar);
    } catch (e) {
      console.error(e);
    }
  }
}

export const controller = new UserController();
