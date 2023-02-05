import { IChat } from "../../api/interfaces";
import Block from "../../utils/Block";
import formatMessageTime from "../../utils/functions/formatMessageTime";
import styles from "./chatListItem.pcss";

// interface ILastMessage {
//   isOutgoing: boolean;
//   content: string;
// }

// export interface IChatListItemProps {
//   avatar?: string;
//   title: string;
//   time: string;
//   messageCount: number;
//   lastMessage: ILastMessage;
// }

export class ChatListItem extends Block<{
  chat: IChat;
  currentUserId: number;
  events: {
    click: () => void;
  };
}> {
  constructor({
    onClick,
    ...props
  }: {
    onClick: (id: number) => void;
    chat: IChat;
    currentUserId: number;
  }) {
    super({
      ...props,
      events: {
        click: () => {
          onClick(props.chat.id);
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
