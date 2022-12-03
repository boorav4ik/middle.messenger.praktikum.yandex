import Block from "../../utils/Block";
import ChatListItem from "../../components/ChatListItem";
import MessagListItem from "../../components/MessagListItem";
import template from "./chats.hbs";
import chatListData from "./chatList.json";
import messagesListData from "./messagList.json";
import "./index.css";

export default class ChatsPage extends Block {
  constructor() {
    super("div", { className: "chats_wrapper" });
  }

  init() {
    document.title = "Чаты";
    this.children.chatList = chatListData.map((data) => new ChatListItem(data));
    this.children.messagList = messagesListData.map(
      (data) => new MessagListItem(data)
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
