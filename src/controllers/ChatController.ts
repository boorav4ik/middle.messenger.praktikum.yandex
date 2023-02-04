import ChatsApi from "../api/ChatsApi";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: typeof ChatsApi;

  constructor() {
    this.api = ChatsApi;
  }

  async create(title: string) {
    await this.api.create(title);

    await this.getChats();
  }

  async getChats() {
    const chats = await this.api.read();

    chats.map(async ({ id }: { id: number }) => {
      const token = await this.api.getToken(id);
      await MessagesController.connect(id, token);
    });

    store.set("chats", chats);
  }

  addUsersToChat(chatId: number, users: number | number[]) {
    this.api.addUsers(chatId, Array.isArray(users) ? users : [users]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.getChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  static selectChat(id: number) {
    store.set("selectedChatId", id);
  }
}

const controller = new ChatsController();

export default controller;
