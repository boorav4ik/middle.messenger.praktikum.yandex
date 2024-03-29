import { IChat } from "../../api/interfaces";
import { Block } from "../../utils/Block";
import { formatMessageTime } from "../../utils/functions/formatMessageTime";

import { controller } from "../../controllers/ChatController";
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
          controller.selectChat(props.chat.id);
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

    return `<li class="${styles.chat_card}">
        <div>
          {{#if chat.avatar}}
            <img
              src="https://ya-praktikum.tech/api/v2/resources/{{chat.avatar}}"
              alt="Chat avatar"
              class="${styles.chat_card_avatar}"
            />
          {{else}}
            <div class="${styles.chat_card_avatar}"></div>
          {{/if}}
        </div>
        <div class="${styles.chat_card_content}">
            <header class="${styles.chat_card_content__header}">
                <span class="${styles.chat_card_content__header__title}">{{chat.title}}</span>
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
