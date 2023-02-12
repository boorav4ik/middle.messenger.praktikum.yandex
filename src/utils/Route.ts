import { Block } from "./Block";

export class Route {
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
    if (!this.block) this.block = new this.view({});

    const root = document.querySelector(this.rootQuery);

    if (!root) {
      throw new Error("Root not found");
    }
    root.innerHTML = "";

    const content = this.block.getContent();
    console.log({ content });

    root.append(content as Node);
    return root;
  }

  leave() {
    this.block?.getContent()?.remove();
  }
}
