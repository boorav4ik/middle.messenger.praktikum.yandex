import Block from "../../utils/Block";
import styles from "./index.pcss";
import chatList from "../../markup/data/chatList.json";
import attachIcon from "../../images/attachIcon.png";
import messageList from "../../mock/messageList";

export default class ChatsPage extends Block {
  constructor() {
    super({ chatList, messageList, attachIcon });
  }

  render() {
    return `<div class="${styles.chat_page_conteiner}">
            <aside class="${styles.aside}">
                <header class="${styles.aside__header}">
                    {{#Link
                        class="${styles.profile__link}"
                        to="/profile"
                    }}
                        Профиль >
                    {{/Link}}
                    {{{Input
                        type="search"
                        name="search"
                        placeholder="🔍 Поиск"
                    }}}
                </header>
                <div class="${styles.list__wrapper}">
                    <ul>
                        {{#each chatList as |chat|}}
                            {{{ChatListItem
                                avatar=chat.avatar
                                author=chat.author
                                time=chat.time
                                messageCount=chat.messageCount
                                lastMessage=chat.lastMessage
                            }}}
                        {{/each}}
                    </ul>
                </div>
            </aside>
            <main class="${styles.main}">
                <header class="${styles.d_flex}">
                    <div>
                        <div class="${styles.avatar} ${styles.large}"></div>
                    </div>
                    <p class="${styles.chat_name}">Вадим</p>
                </header>
                <div class="${styles.list__wrapper}">
                    <ul>
                        {{#each messageList as |message|}}
                            {{{MessageListItem
                                time=message.time
                                image=message.image
                                text=message.text
                                outgoing=message.outgoing
                                delivered=message.delivered
                            }}}
                        {{/each}}
                    </ul>
                </div>
                <footer class="${styles.d_flex}">
                    {{{AttachInput icon=attachIcon}}}
                    {{{Input
                        type="text"
                        className="${styles.message_input}"
                        placeholder="Сообщение"
                        name="message"
                    }}}
                    {{{Button label="➜"}}}
                </footer>
            </main>
        </div>`;
  }
}
