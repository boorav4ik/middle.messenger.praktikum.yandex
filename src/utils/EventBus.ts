export type Callback = (...args: unknown[]) => void;

export class EventBus<Props extends Record<string, Callback[]>> {
  private readonly listeners: {
    [K in keyof Props]?: Callback[];
  } = {};

  on<K extends keyof Props>(event: K, callback: Callback) {
    this.listeners[event] ??= [];
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof Props>(event: K, callback: Callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter((cb) => cb !== callback);
  }

  emit<K extends keyof Props>(event: K, ...args: unknown[]) {
    if (!this.listeners[event]) return;
    this.listeners[event]!.forEach((callback) => {
      callback(...args);
    });
  }
}
