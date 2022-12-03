import Block from "../../utils/Block";
import template from "./messageListItem.hbs";
import "./index.css";

interface IMessagListItemProps {
  delivered?: boolean;
  outgoing?: boolean;
  text?: string;
  image?: string;
  time: string;
}

export default class MessagListItem extends Block {
  constructor(props: IMessagListItemProps) {
    console.log(props);

    super("li", {
      ...props,
      className: "message__item "
        .concat(props.outgoing ? "outgoing" : "incoming")
        .concat(` ${props.image ? "image" : "text"}__wrapper`),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
