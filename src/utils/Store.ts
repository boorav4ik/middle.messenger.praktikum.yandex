import { IChat, User } from "../api/interfaces";
import { IMessage } from "../controllers/MessagesController";
import EventBus from "./EventBus";
import set from "./functions/set";
import StoreEvents from "./types/StoreEvents";

interface IState {
  user: User;
  chats: IChat[];
  messages: Record<number, IMessage[]>;
  currentChat?: number;
}

class Store extends EventBus<Record<string, (() => void)[]>> {
  private state = {};

  public set(key: string, value: any) {
    set(this.state, key, value);
    console.log("setState");

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    console.log("getState", this.state);
    return this.state;
  }
}

const store = new Store();

export default store;
