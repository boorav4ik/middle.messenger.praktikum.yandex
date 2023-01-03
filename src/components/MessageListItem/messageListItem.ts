import Block from "../../utils/Block";
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
    const className = styles.message__item
      .concat(this.props.outgoing ? ` ${styles.outgoing}` : "")
      .concat(this.props.image ? ` ${styles.media}` : "");
    return `<li
            class="${className}"
        >
            {{#if image}}
                <img src={{image}} />
            {{else}}
                <span>{{ text }}</span>
            {{/if}}
            <footer>
                {{#delivered}}<span class="${styles.status}">✓✓</span>{{/delivered}}
                <span class="${styles.time_label}">{{time}}</span>
            </footer>

    </li>`;
  }
}
