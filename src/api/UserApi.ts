import { BaseApi } from "./BaseApi";

class UserApi extends BaseApi {
  constructor() {
    super("/user");
  }

  changeProfile(data: Record<string, string>) {
    this.http.put("/profile", { data });
  }

  changeAvatar(data: FormData) {
    return this.http.put("/profile/avatar", { data });
  }
}

export const api = new UserApi();
