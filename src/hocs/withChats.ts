import { IChat, IMessage } from "../api/interfaces";
import { withStore } from "./withStore";

export const withChats = withStore(
  ({ chats, messages, selectedChatId, selectedChatUsers, user: { id: currentUserId } }) => {
    return {
      chats: [...chats],
      messages: selectedChatId ? messages[selectedChatId] : undefined,
      currentUserId,
      selectedChatId,
      selectedChatUsers
    };
  }
);

export interface WithChats {
  chats: IChat[];
  messages: IMessage[];
  selectedChatId: number;
  currentUserId: number;
}
