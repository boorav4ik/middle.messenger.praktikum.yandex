import { api } from "../api/UserApi";
import { store } from "../utils/Store";

class UserController {
  private readonly api = api;

  public async uploadProfile(data: Record<string, string>) {
    try {
      const user = await this.api.changeProfile(data);
      store.set("user", user);
    } catch (e) {
      console.error(e);
    }
  }

  public async uploadAvatar(data: FormData) {
    try {
      const user = await this.api.changeAvatar(data);
      store.set("user", user);
    } catch (e) {
      console.error(e);
    }
  }

  public async uploadPassword({
    oldPassword,
    newPassword
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      await this.api.changePassword({ oldPassword, newPassword });
    } catch (e) {
      console.error(e);
    }
  }
}

export const controller = new UserController();
