import { IChat } from "../../api/interfaces";
import Block from "../../utils/Block";
import formatMessageTime from "../../utils/functions/formatMessageTime";
import store from "../../utils/Store";
import styles from "./chatListItem.pcss";

export class ChatListItem extends Block<{
  chat: IChat;
  currentUserId: number;
  events: {
    click: () => void;
  };
}> {
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
      chat: { last_message },
      currentUserId
    } = this.props;

    const isOutgoing = currentUserId === last_message?.user.id;
    const time = last_message ? formatMessageTime(last_message.time) : "";

    return `<li class="${styles.chat_card}">
        <div style="width: 57px;">
            <div class="${styles.chat_card_avatar}">{{ chat.avatar }}</div>
        </div>
        <div class="${styles.chat_card_content}">
            <header>
                <span class="${styles.author}">{{chat.title}}</span>
                <span class="${styles.time}">${time}</span>
            </header>
            <div class="${styles.content}">
                <div class="${styles.message}">
                    {{#chat.last_message }}
                        <span>
                            {{#if ${isOutgoing}}}<b>Вы:</b>{{/if}}
                            {{ this.content }}
                        </span>
                    {{/chat.last_message }}
                </div>
                <div>
                    {{#if chat.messageCount}}
                        <div class="${styles.count}">
                            {{ chat.messageCount }}
                        </div>
                    {{/if}}
                </div>
            </div>
        </div>
    </li>`;
  }
}
