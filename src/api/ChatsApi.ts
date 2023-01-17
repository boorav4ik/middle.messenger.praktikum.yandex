import CrudApi from "./CrudApi";

interface GetChatData {
  offset: number;
  limit: number;
  title: string;
}

export default class ChatsApi extends CrudApi {
  constructor() {
    super("/chats");
  }

  public update = undefined;

  // Create chat
  public create(title: string): Promise<unknown> {
    return this.http.post("", { data: { title } });
  }

  // Delete chat
  public delete(chatId: number): Promise<unknown> {
    return this.http.delete("", { data: { chatId } });
  }

  // Get chats
  public read(data: Record<string, unknown>): Promise<unknown> {
    return this.http.get("", { data });
  }

  // Get new messages count
  public getNewMessagesCount(id: number) {
    return this.http.get(`/new/${id}`);
  }

  // Get chat users
  public getUsers(id: number, offset: number, limit: number, name: string, email: string) {
    return this.http.get(`/${id}/users`, { data: { offset, limit, name, email } });
  }
  
}
