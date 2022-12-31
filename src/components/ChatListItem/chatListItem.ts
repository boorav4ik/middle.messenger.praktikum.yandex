import Block from "../../utils/Block";
import styles from "./chatListItem.pcss";

// interface ILastMessage {
//     isOutgoing: boolean;
//     content: string;
// }

// interface IChatListItemProps {
//     avatar?: string;
//     author: string;
//     time: string;
//     messageCount: number;
//     lastMessage: ILastMessage;
// }
export class ChatListItem extends Block {
    render() {
        return `<li class=${styles.chat_card}>
            <div class=${styles.chat_card_avatar}>{{ avatar }}</div>
            <div class=${styles.chat_card_content}">
                <header class=${styles.chat_card_content_header}>
                    <span class=${styles.chat_card_author}>{{author}}</span>
                    <span class=${styles.chat_card_time}>{{time}}</span>
                </header>
                <div class=${styles.chat_card_content_message}>
                    <div class="flex-1 content">
                        {{#lastMessage }}
                            <span>
                                {{#isOutgoing}}<b>Вы:</b>{{/isOutgoing}}
                                {{ this.content }}
                            </span>
                        {{/lastMessage }}
                    </div>
                    <div class="count">
                        {{#messageCount}}
                            <div class="blue circle small">
                                {{ this }}
                            </div>
                        {{/messageCount}}
                    </div> 
                </div>
            </div>
        </li>`
    }
};
