import Block from "./Block";

class Route {
  private block: Block | null;

  constructor(private pathname: string, private view: typeof Block, private rootQuery: string) {
    this.block = null;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) this.block = new this.view();

    const root = document.querySelector(this.rootQuery);

    if (!root) {
      throw new Error("Root not found");
    }
    root.innerHTML = "";

    root.appendChild(this.block.getContent() as Node);
  }

  leave() {
    this.block?.getContent()?.remove();
  }
}

export default Route;
