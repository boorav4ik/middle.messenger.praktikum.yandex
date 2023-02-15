import { Block } from "../../utils/Block";
import styles from "./index.pcss";
import { Routes } from "../../utils/types/Routes";
import { withChats, WithChats } from "../../hocs/withChats";
import { controller } from "../../controllers/ChatController";
import template from "./index.hbs";

class ChatsPage extends Block {
  constructor(props: WithChats) {
    document.title = "Chokak - Chats";
    controller.getChats();

    super({
      showAddChatDialog: () => {
        this.setProps({ openAddChatDialog: true });
      },
      addChatHandle: () => {
        const { value } = this.refs.newChatTitle.getContent() as HTMLInputElement;
        if (value) controller.create(value);
        this.setProps({ openAddChatDialog: false });
      },
      ...props
    });
  }

  render() {
    const { chats = [], selectedChatId } = this.props;
    const selectedChat = chats.find(({ id }: { id: number }) => id === selectedChatId) ?? {
      title: "TOP SICRET"
    };

    return this.compile(template, {
      ...this.props,
      styles,
      routesSettings: Routes.Settings,
      selectedChat
    });
  }
}

const chatPageWithStore = withChats(ChatsPage as typeof Block);

export { chatPageWithStore as ChatsPage };
