import Block from "../../utils/Block";
import styles from "./messageListItem.pcss";


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
            class="message__item {{#if outgoing}}outgoing{{else}}incoming{{/if}} {{#if image}}image__wrapper{{else}}text__wrapper{{/if}}">
                {{#if image}}
            <img src={{image}} />
            <div class="time_label">{{time}}</div>
        {{else}}
            <span>{{ text }}</span>
            <div class="time_label">
                {{#delivered}}<span class="status">✓✓</span>{{/delivered}}
                <span>{{time}}</span>
            </div>
        {{/if}}
    </li>`
    }
};
