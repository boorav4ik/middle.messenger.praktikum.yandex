import EventBus from "./EventBus";
import set from "./functions/set";
import StoreEvents from "./types/StoreEvents";

class Store extends EventBus<Record<string, (() => void)[]>> {
  private state = {};

  public set(key: string, value: any) {
    set(this.state, key, value);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export default store;
