import Block from "../../utils/Block";
import styles from "./chatListItem.pcss";

interface ILastMessage {
  isOutgoing: boolean;
  content: string;
}

export interface IChatListItemProps {
  avatar?: string;
  author: string;
  time: string;
  messageCount: number;
  lastMessage: ILastMessage;
}

export class ChatListItem extends Block<IChatListItemProps> {
  render() {
    return `<li class="${styles.chat_card}">
            <div style="width: 57px;">
                <div class="${styles.chat_card_avatar}">{{ avatar }}</div>
            </div>
            <div class="${styles.chat_card_content}">
                <header>
                    <span class="${styles.author}">{{author}}</span>
                    <span class="${styles.time}">{{time}}</span>
                </header>
                <div class="${styles.content}">
                    <div class="${styles.message}">
                        {{#lastMessage }}
                            <span>
                                {{#isOutgoing}}<b>Вы:</b>{{/isOutgoing}}
                                {{ this.content }}
                            </span>
                        {{/lastMessage }}
                    </div>
                    <div>
                        {{#if messageCount}}
                            <div class="${styles.count}">
                                {{ messageCount }}
                            </div>
                        {{/if}}
                    </div>
                </div>
            </div>
        </li>`;
  }
}
