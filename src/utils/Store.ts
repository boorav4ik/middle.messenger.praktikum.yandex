import { IChat, User, IMessage } from "../api/interfaces";
import { EventBus } from "./EventBus";
import { set } from "./functions/set";
import { StoreEvents } from "./types/StoreEvents";

export interface IState {
  user: User;
  chats: IChat[];
  messages: Record<number, IMessage[]>;
  selectedChatId?: number;
  selectedChatUsers: User[];
}

class Store extends EventBus<Record<string, (() => void)[]>> {
  private state: IState = {
    user: {} as User,
    chats: [],
    messages: {},
    selectedChatId: undefined,
    selectedChatUsers: []
  };

  public set(key: string, value: unknown) {
    set(this.state, key, value);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();
