import { IChat } from "../../api/interfaces";
import { Block } from "../../utils/Block";
import { formatMessageTime } from "../../utils/functions/formatMessageTime";
import { store } from "../../utils/Store";
import styles from "./chatListItem.pcss";
import template from "./chatListItem.hbs";

export class ChatListItem extends Block {
  constructor(props: { chat: IChat; currentUserId: number }) {
    super({
      ...props,
      events: {
        click: () => {
          store.set("selectedChatId", props.chat.id);
        }
      }
    });
  }

  render() {
    const {
      chat: { last_message: lastMessage },
      currentUserId
    } = this.props;

    const isOutgoing = currentUserId === lastMessage?.user.id;
    const time = lastMessage ? formatMessageTime(lastMessage.time) : "";

    return this.compile(template, { ...this.props, styles, isOutgoing, time });
  }
}
