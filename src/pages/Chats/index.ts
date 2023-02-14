import { Block } from "utils/Block";
import styles from "./index.pcss";
import { Routes } from "utils/types/Routes";
import { withChats, WithChats } from "hocs/withChats";
import { controller } from "controllers/ChatController";

class ChatsPage extends Block<
  WithChats & {
    showAddChatDialog: () => void;
    addChatHandle: () => void;
  }
> {
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
    const selectedChat = chats.find(({ id }) => id === selectedChatId) ?? {
      title: "TOP SICRET"
    };

    return `<div class="${styles.chat_page_conteiner}">
            <aside class="${styles.aside}">
                <header class="${styles.aside__header}">
                    {{#Link
                        class="${styles.profile__link}"
                        to="${Routes.Settings}"
                    }}
                        Профиль >
                    {{/Link}}
                    {{{Input
                        type="search"
                        name="search"
                        placeholder="🔍 Поиск"
                    }}}
                </header>
                {{{ChatList}}}
                {{{Button label="+" circle=true onClick=showAddChatDialog}}}
                <dialog {{#openAddChatDialog}}open{{/openAddChatDialog}}>
                <h1>Твой чат - твои правила</h1>
                <form method="dialog"  >
                  {{{Input
                    type="text"
                    name="title"
                    placeholder="О дивный новый чат"
                    ref="newChatTitle"
                  }}}
                  {{{Button label="Создать" onClick=addChatHandle}}}
                </dialog>
            </aside>
            <main class="${styles.main}">
              {{#if selectedChatId}}
                <header class="${styles.d_flex}">
                    <div>
                        <div class="${styles.avatar} ${styles.large}"></div>
                    </div>
                    <p class="${styles.chat_name}">
                      ${selectedChat.title}
                    </p>
                </header>
                {{{MessageList}}}
                <footer class="${styles.d_flex}">
                    {{{Messenger}}}
                </footer>
              {{else}}
              <div> Нужно выбрать чат</div>
              {{/if}}

            </main>
        </div>`;
  }
}
const chatPageWithStore = withChats(ChatsPage as typeof Block);

export { chatPageWithStore as ChatsPage };
