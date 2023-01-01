import Block from '../../utils/Block';
import styles from './messageListItem.pcss';

// interface IMessageListItemProps {
//     time: string;
//     image?: string;
//     text?: string;
//     outgoing?: boolean;
//     delivered?: boolean;
// }

export class MessageListItem extends Block {
  render() {
    return `<li
            class="${styles.message__item} {{#if outgoing}}${styles.outgoing}{{/if}} {{#if image}}${styles.media}{{/if}}"
        >
            {{#if image}}
                <img src={{image}} />
                <div class="${styles.time_label}">
                    {{time}}
                </div>
            {{else}}
                <span>{{ text }}</span>
                <div class="${styles.time_label}">
                    {{#delivered}}<span class="status">✓✓</span>{{/delivered}}
                    <span>{{time}}</span>
                </div>
            {{/if}}
    </li>`;
  }
}
