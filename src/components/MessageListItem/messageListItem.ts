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
