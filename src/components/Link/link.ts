import { withRouter, PropsWithRouter } from "../../hocs/whitRouter";
import { Block } from "../../utils/Block";
import styles from "./link.pcss";

interface ILinkProps extends PropsWithRouter {
  to: string;
  class?: string;
}

class Link extends Block<ILinkProps & { events: Record<string, () => void> }> {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: () => this.props.router.go(this.props.to)
      }
    });
  }

  render() {
    return `<span class="${this.props.class ?? styles.link}"></span>`;
  }
}

export const LinkWithRouter = withRouter(Link);
