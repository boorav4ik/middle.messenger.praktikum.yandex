import { Block } from "../../utils/Block";
import { withStore } from "../../hocs/withStore";
import template from "./messageList.hbs";

class MessageList extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}

const withMessageList = withStore(({ selectedChatId, user, messages, chats }) => ({
  currentUserId: user.id,
  messages: selectedChatId ? [...messages[selectedChatId]].reverse() : [],
  chat: selectedChatId ? { ...chats.find(({ id }) => id === selectedChatId) } : null
}));

export const Index = withMessageList(MessageList);
