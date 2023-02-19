import { BaseApi } from "./BaseApi";

class UserApi extends BaseApi {
  constructor() {
    super("/user");
  }

  changeProfile(data: Record<string, string>) {
    return this.http.put("/profile", { data });
  }

  changeAvatar(data: FormData) {
    return this.http.put("/profile/avatar", { data });
  }

  changePassword(data: { oldPassword: string; newPassword: string }) {
    return this.http.put("/password", { data });
  }
}

export const api = new UserApi();
