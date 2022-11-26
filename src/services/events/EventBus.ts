export default class EventBus {
  private readonly listeners: Record<string, ((...args: unknown[]) => void)[]> = {}


  checkEvent(event: string) {
    if (!this.listeners[event]) throw new Event(`Нет события ${event}`);
  }

  on(event: string, callback: () => void): void {
    this.listeners[event] ??= [];
    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void): void {
    this.checkEvent(event);
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]): void {
    this.checkEvent(event);
    this.listeners[event].forEach((listener) => listener(...args));
  }
}
