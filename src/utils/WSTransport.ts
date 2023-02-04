import EventBus, { Callback } from "./EventBus";

export enum WSEvent {
  Connected = "connected",
  Close = "close",
  Error = "error",
  Message = "message"
}

class WSTransport extends EventBus<Record<string, Callback[]>> {
  private socket: WebSocket | null = null;

  private pingInterval = 0;

  private url = "wss://ya-praktikum.tech/ws/chats/";

  constructor(private endpoint: string) {
    super();
  }

  connect(): Promise<void> {
    this.socket = new WebSocket(`${this.url}${this.endpoint}`);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSEvent.Connected, () => {
        resolve();
      });
      this.on(WSEvent.Close, () => {
        reject();
      });
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if (data.type === "pong") return;

      this.emit(WSEvent.Message, data);
    });

    socket.addEventListener("open", () => {
      this.emit(WSEvent.Connected);
    });

    socket.addEventListener("close", () => {
      this.emit(WSEvent.Close);
    });

    socket.addEventListener("error", (error) => {
      this.emit(WSEvent.Error, error);
    });
  }

  send(data: unknown) {
    if (!this.socket) throw new Error("Websocket connection not yet established");

    this.socket.send(JSON.stringify(data));
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, 5000);

    this.on(WSEvent.Close, () => {
      clearInterval(this.pingInterval);
    });

    this.pingInterval = 0;
  }

  public close() {
    this.socket?.close();
  }
}

export default WSTransport;
