import { withRouter, PropsWithRouter } from "../../hocs/whitRouter";
import { Block } from "../../utils/Block";
import styles from "./link.pcss";
import template from "./link.hbs";

interface ILinkProps extends PropsWithRouter {
  to: string;
  className?: string;
}

class Link extends Block {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: () => this.props.router.go(this.props.to)
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const LinkWithRouter = withRouter(Link as typeof Block);
