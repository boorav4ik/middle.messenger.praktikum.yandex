import { Block } from "../../utils/Block";
import { withStore } from "../../hocs/withStore";

class ChatList extends Block {
  protected render(): string {
    return `{{#ListWithScroll}}
        <ul>
            {{#each chats}}
                {{{ChatListItem
                  chat=.
                  currentUserId=../currentUserId
                }}}
            {{/each}}
        </ul>
    {{/ListWithScroll}}`;
  }
}

const withChats = withStore(({ user, chats, selectedChatId }) => ({
  chats: [...chats],
  currentUserId: user.id,
  selectedChatId
}));

export const Index = withChats(ChatList);
