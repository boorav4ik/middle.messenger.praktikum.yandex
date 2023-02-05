import Block from "../../utils/Block";
import formatMessageTime from "../../utils/functions/formatMessageTime";
import styles from "./messageListItem.pcss";

export interface IMessageListItemProps {
  time: string;
  image?: string;
  text?: string;
  outgoing?: boolean;
  delivered?: boolean;
}

export class MessageListItem extends Block<IMessageListItemProps> {
  render() {
    const { message, currentUserId } = this.props;
    const time = formatMessageTime(message.time);

    const className = styles.message__item
      .concat(message.user_id === currentUserId ? ` ${styles.outgoing}` : "")
      .concat(message.type === "message" ? "" : ` ${styles.media}`);
    // return `<li
    //         class="${className}"
    //     >
    //         {{#if image}}
    //             <img src={{image}} />
    //         {{else}}
    //             <span>{{ text }}</span>
    //         {{/if}}
    //         <footer>
    //             {{#delivered}}<span class="${styles.status}">✓✓</span>{{/delivered}}
    //             <span class="${styles.time_label}">{{time}}</span>
    //         </footer>

    // </li>`;
    return `<li class="${className}">
        {{#with message}}
        <span>{{content}}
        <footer>
          {{#is_read}}<span class="${styles.status}">✓✓</span>{{/is_read}}
          <span class="${styles.time_label}">${time}</span>
        </footer>
        {{/with}}
      </li>`;
  }
}
