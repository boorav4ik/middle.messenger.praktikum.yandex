import { WSTransport, WSEvent } from "../utils/WSTransport";
import { store } from "../utils/Store";
import { IMessage, User } from "../api/interfaces";

enum WSType {
  Message = "message",
  GetOld = "get old"
}

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSEvent.Message, (message) => {
      this.onMessage(id, message as IMessage);
    });
    transport.on(WSEvent.Close, () => this.onClose(id));
  }

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) return;

    const { id: userId } = store.getState().user as User;

    const socket = new WSTransport([userId, id, token].join("/"));

    this.sockets.set(id, socket);

    await socket.connect();

    this.subscribe(socket, id);
    this.getOldMessages(id, 0);
  }

  getSocket(chatId: number) {
    if (!this.sockets.has(chatId)) throw new Error(`Chat ${chatId} is not connected`);
    return this.sockets.get(chatId);
  }

  getOldMessages(chatId: number, content: number) {
    const socket = this.getSocket(chatId);
    if (socket) socket.send({ type: WSType.GetOld, content });
  }

  sendMessage(content: string) {
    const chatId = store.getState().selectedChatId;
    if (!chatId) return;
    const socket = this.getSocket(chatId);
    if (socket) socket.send({ type: WSType.Message, content });
  }

  // eslint-disable-next-line class-methods-use-this
  private onMessage(id: number, messages: IMessage | IMessage[]) {
    const newMessages: IMessage[] = store.getState().messages?.[id] ?? [];
    if (Array.isArray(messages)) {
      messages.reverse().forEach((m) => newMessages.push(m));
    } else {
      newMessages.push(messages);
    }

    store.set(`messages.${id}`, newMessages);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((s) => s.close());
  }
}

export const controller = new MessagesController();
