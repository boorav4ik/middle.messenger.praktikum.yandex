import { api } from "api/ChatsApi";
import { store } from "utils/Store";
import { controller as MessagesController } from "./MessagesController";

class ChatsController {
  private readonly api = api;

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

  // eslint-disable-next-line class-methods-use-this
  selectChat(id: number) {
    store.set("selectedChatId", id);
  }
}

export const controller = new ChatsController();
