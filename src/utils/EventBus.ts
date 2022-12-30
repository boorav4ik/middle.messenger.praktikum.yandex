type Callback = (...args: unknown[]) => void;

export default class EventBus {
  private readonly listeners: Record<string, Callback[]> = {};
  on(event: string, callback: Callback) {
    this.listeners[event] ??= [];
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter(
      cb => cb !== callback
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach(function (callback) {
      callback(...args);
    });
  }
}