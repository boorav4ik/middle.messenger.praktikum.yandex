import Block from "../../utils/Block";
import styles from "./index.pcss";
import chatList from "../../mock/chatList.json";
import messageList from "../../mock/messageList";
import { IMessageListItemProps } from "../../components/MessageListItem/messageListItem";
import { IChatListItemProps } from "../../components/ChatListItem/chatListItem";
import Routes from "../../utils/types/Routes";
import withChats from "../../hocs/withChats";

interface IChatsPageProps {
  chatList: IChatListItemProps[];
  messageList: IMessageListItemProps[];
}
class ChatsPage extends Block<IChatsPageProps> {
  constructor(props) {
    console.log(props);

    document.title = "Chokak - Chats";
    super({ chatList, messageList });
  }

  render() {
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
                    {{{Messenger}}}
                </footer>
            </main>
        </div>`;
  }
}

export default withChats(ChatsPage);
