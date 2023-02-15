import { Block } from "../../utils/Block";
import { withStore } from "../../hocs/withStore";
import template from "./chatList.hbs";

class ChatList extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}

const withChats = withStore(({ user, chats, selectedChatId }) => ({
  chats: [...chats],
  currentUserId: user.id,
  selectedChatId
}));

export const Index = withChats(ChatList);
