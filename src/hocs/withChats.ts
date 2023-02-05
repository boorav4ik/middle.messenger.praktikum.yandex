import { IChat } from "../api/interfaces";
import { IMessage } from "../controllers/MessagesController";
import { whitStore } from "./whitStore";

const withChats = whitStore(({ chats, messages, selectedChatId, user: { id: currentUserId } }) => {
  return {
    chats: [...chats],
    messages: selectedChatId ? messages[selectedChatId] : undefined,
    currentUserId,
    selectedChatId
  };
});

export default withChats;

export interface WithChats {
  chats: IChat[];
  messages: IMessage[];
  selectedChatId: number;
  currentUserId: number;
}
