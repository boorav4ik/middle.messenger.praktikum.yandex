import Block from "./Block";
import PlainObject from "./types/PlainObject";

class Route {
  private pathname: string;

  private view: typeof Block;

  private block: Block | null;

  private props: PlainObject;

  private rootQuery: string;

  constructor(pathname: string, view: typeof Block, rootQuery: string, props: PlainObject) {
    this.pathname = pathname;
    this.view = view;
    this.block = null;
    this.props = props;
    this.rootQuery = rootQuery;
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
    // eslint-disable-next-line new-cap
    if (!this.block) this.block = new this.view(this.props);

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
