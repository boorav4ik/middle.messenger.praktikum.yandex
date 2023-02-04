import { IChat, User } from "../api/interfaces";
import { IMessage } from "../controllers/MessagesController";
import EventBus from "./EventBus";
import set from "./functions/set";
import StoreEvents from "./types/StoreEvents";

export interface IState {
  user: User;
  chats: IChat[];
  messages: Record<number, IMessage[]>;
  selectedChatId?: number;
}

class Store extends EventBus<Record<string, (() => void)[]>> {
  private state = { user: {}, chats: [], messages: {} };

  public set(key: string, value: unknown) {
    set(this.state, key, value);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

window.store = store;

export default store;
