import { Block } from "../../utils/Block";
import { withStore } from "../../hocs/withStore";

class MessageList extends Block {
  protected render(): string {
    return `{{#ListWithScroll}}
      {{#if messages}}
        <ul>
          {{#each messages}}
            {{{MessageListItem
              message=.
              currentUserId=../currentUserId}}}
          {{/each}}
        </ul>
      {{else}}
        <div>Чёkak?</div>
      {{/if}}
    {{/ListWithScroll}}`;
  }
}

const withMessageList = withStore(({ selectedChatId, user, messages, chats }) => ({
  currentUserId: user.id,
  messages: selectedChatId ? [...messages[selectedChatId]].reverse() : [],
  chat: selectedChatId ? { ...chats.find(({ id }) => id === selectedChatId) } : null
}));

export const Index = withMessageList(MessageList);
