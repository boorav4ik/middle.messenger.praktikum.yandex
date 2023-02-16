import { CrudApi } from "./CrudApi";
import { IChat, User } from "./interfaces";

export class ChatsApi extends CrudApi {
  constructor() {
    super("/chats");
  }

  public update = undefined;

  // Create chat
  public create(title: string): Promise<unknown> {
    return this.http.post("/", { data: { title } });
  }

  // Delete chat
  public delete(chatId: number): Promise<unknown> {
    return this.http.delete("/", { data: { chatId } });
  }

  // Get chats
  public read(): Promise<IChat[]> {
    return this.http.get("/");
  }

  // Get new messages count
  public getNewMessagesCount(id: number) {
    return this.http.get(`/new/${id}`);
  }

  // Get chat users
  public getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  public addUsers(chatId: number, users: number[]): Promise<unknown> {
    return this.http.put("/users", { data: { chatId, users } });
  }

  public removeUser(chatId: number, users: number[]): Promise<unknown> {
    return this.http.delete("/users", { data: { chatId, users } });
  }

  public setAvatar(id: number, avatar: File) {
    return this.http.put(`/avatar`, { data: { chatId: id, avatar } });
  }

  async getToken(id: number): Promise<string> {
    return (await this.http.post(`/token/${id}`)).token;
  }
}

export const api = new ChatsApi();
