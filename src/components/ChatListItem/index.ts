import Block from "../../utils/Block";
import template from "./ChatListItem.hbs";
import "./index.css";

interface IChatListItemProps {
  author: string;
  lastMessage: { isOutgoing: boolean; content: string };
  time: string;
  messageCount: number;
  avatar: string | null;
}

export default class ChatListItem extends Block {
  constructor(props: IChatListItemProps) {
    super("li", { ...props, className: "flex-sb b-divider chat__item" });
  }

  render() {
    return this, this.compile(template, this.props);
  }
}
