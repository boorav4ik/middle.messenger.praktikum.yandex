import { IMessage } from "../../api/interfaces";
import { Block } from "../../utils/Block";
import { formatMessageTime } from "../../utils/functions/formatMessageTime";
import styles from "./messageListItem.pcss";
import template from "./messageListItem.hbs";

export interface IMessageListItemProps {
  time: string;
  image?: string;
  text?: string;
  outgoing?: boolean;
  delivered?: boolean;
  message: IMessage;
  currentUserId: number;
}

export class MessageListItem extends Block {
  render() {
    const { message, currentUserId } = this.props;
    const time = formatMessageTime(message.time);

    const className = styles.message__item
      .concat(message.user_id === currentUserId ? ` ${styles.outgoing}` : "")
      .concat(message.type === "message" ? "" : ` ${styles.media}`);

    return this.compile(template, { ...this.props, styles, className, time });
  }
}
