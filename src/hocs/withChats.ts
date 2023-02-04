import { whitStore } from "./whitStore";

const withChats = whitStore(({ chats, messages, selectedChatId }) => {
  return { chats: [...chats], messages: { ...messages }, selectedChatId };
});

export default withChats;
