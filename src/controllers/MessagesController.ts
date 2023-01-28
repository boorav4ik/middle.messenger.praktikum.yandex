import WSTransport, { WSEvent } from "../utils/WSTransport";
import store from "../utils/Store";

enum WSType {
  Message = "message",
  GetOld = "get old"
}

interface IFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: IFile;
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

    const userId = store.getState().user.id;

    const socket = new WSTransport([userId, id, token].join("/"));

    this.sockets.set(id, socket);

    await socket.connect();

    this.subscribe(socket, id);
    this.getOldMessages(id);
  }

  getSocket(chatId: number) {
    if (!this.sockets.has(chatId)) throw new Error(`Chat ${chatId} is not connected`);
    return this.sockets.get(chatId);
  }

  getOldMessages(chatId: number) {
    const socket = this.getSocket(chatId);
    if (socket) socket.send({ type: WSType.GetOld, content: 0 });
  }

  sendMessage(chatId: number, content: string) {
    const socket = this.getSocket(chatId);
    if (socket) socket.send({ type: WSType.Message, content });
  }

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

export default new MessagesController();
