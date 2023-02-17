import { Block } from "../../utils/Block";
import styles from "./index.pcss";
import { Routes } from "../../utils/types/Routes";
import { withChats, WithChats } from "../../hocs/withChats";
import { controller } from "../../controllers/ChatController";
import { ValidationType } from "../../utils/Validator";

class ChatsPage extends Block<
  WithChats & {
    showAddChatDialog: () => void;
    addChatHandle: () => void;
    removeChatHandle: () => void;
    showAddUserDialod: () => void;
    closeAddUserDialod: () => void;
    addUserHandle: ({ userId }: { userId: string }) => void;
    addUserFields: Record<string, unknown>;
    addUserActions: [Record<string, unknown>];
    showRemoveUserDialog: () => void;
    closeRemoveUserDialog: () => void;
    onRemoveUserSubmit: ({ userId }: { userId: string }) => void;
    removeUserActions: [Record<string, unknown>];
    removeUserFields: Record<string, unknown>;
    uploadChatAvatar: ({ target }: SubmitEvent) => void;
    showUploadChatAvatarDialog: () => void;
    closeUploadChatAvatarDialog: () => void;
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
      removeChatHandle: () => {
        controller.delete(this.props.selectedChatId);
      },
      showAddUserDialod: () => {
        this.setProps({ openAddUserDialog: true });
      },
      closeAddUserDialod: () => {
        this.setProps({ openAddUserDialog: false });
      },
      addUserHandle: ({ userId }) => {
        controller.addUsersToChat(this.props.selectedChatId, Number(userId));

        this.setProps({ openAddUserDialog: false });
      },
      addUserFields: {
        userId: {
          label: "Id",
          validationType: ValidationType.Number,
          required: true
        }
      },
      addUserActions: [
        {
          label: "Добавить",
          type: "submit"
        }
      ],
      showRemoveUserDialog: () => {
        this.setProps({ openRemoveUserDialog: true });
      },
      closeRemoveUserDialog: () => {
        this.setProps({ openRemoveUserDialog: false });
      },
      removeUserActions: [{ type: "submit", label: "удалить пользователя" }],
      onRemoveUserSubmit: ({ userId }) => {
        controller.removeUserFromChat(this.props.selectedChatId, Number(userId));
        this.setProps({ openRemoveUserDialog: false });
      },
      uploadChatAvatar: ({ target }) => {
        if (!target) return;
        const data = new FormData(target as HTMLFormElement);
        data.append("chatId", String(this.props.selectedChatId));
        controller.uploadChatAvatar(data);
        this.setProps({ openUploadChatAvatarDialog: false });
      },
      showUploadChatAvatarDialog: () => {
        this.setProps({ openUploadChatAvatarDialog: true });
      },
      closeUploadChatAvatarDialog: () => {
        this.setProps({ openUploadChatAvatarDialog: false });
      },
      removeUserFields: {
        userId: {
          label: "Id",
          validationType: ValidationType.Number,
          required: true
        }
      },
      ...props
    });
  }

  render() {
    const { chats = [], selectedChatId, currentUserId } = this.props;
    const selectedChat = chats.find(({ id }) => id === selectedChatId) ?? {
      title: "TOP SICRET",
      created_by: undefined,
      avatar: ""
    };
    const isAdmin = selectedChat.created_by === currentUserId;

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
                <form method="dialog">
              {{{Input
                type="text"
                name="title"
                placeholder="О дивный новый чат"
                ref="newChatTitle"
              }}}
              {{{Button label="Создать" onClick=addChatHandle}}}
              </form>
            </dialog>
        </aside>
        <main class="${styles.main}">
          {{#if selectedChatId}}
            <header class="${styles.d_flex}">
              <div>
                {{#if ${isAdmin}}}
                  {{{ImageButton
                    className="${styles.avatar} ${styles.large}"
                    label="Поменять аватар"
                    image="${
                      selectedChat.avatar
                        ? `https://ya-praktikum.tech/api/v2/resources/${selectedChat.avatar}`
                        : ""
                    }"
                    onClick=showUploadChatAvatarDialog}}}
                    <dialog {{#openUploadChatAvatarDialog}}open{{/openUploadChatAvatarDialog}}>
                    {{#Form onSubmit=uploadChatAvatar }}
                      <label for="avatar" title="Выберете файл">
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                      />
                      {{{Button label="Поменять" type="submit"}}}
                      {{{Button label="Отмена" onClick=closeUploadChatAvatarDialog}}}
                    {{/Form}}
                    </dialog>
                {{else}}
                <div class="${styles.avatar} ${styles.large}"></div>
                {{/if}}
              </div>
                <p class="${styles.chat_name}">
                  ${selectedChat.title}
                </p>
                <div class="${styles.chat_options}">
                  {{{Button
                    variant="text"
                    label="Add User"
                    title="Пригласить пользователя"
                    onClick=showAddUserDialod
                  }}}
                  <dialog {{#openAddUserDialog}}open{{/openAddUserDialog}}>
                    <h3>Введите Id пользователя</h3>
                    {{#Form fields=addUserFields actions=addUserActions onSubmit=addUserHandle}}
                    {{/Form}}
                    {{{Button label="Отмена" onClick=closeAddUserDialod}}}
                  </dialog>
                  {{{Button
                    variant="text"
                    label="Remove user"
                    title="Удалить пользователя из чата"
                    onClick=showRemoveUserDialog
                  }}}
                  <dialog {{#openRemoveUserDialog}}open{{/openRemoveUserDialog}}>
                  <h3>Введите Id пользователя</h3>
                    {{#Form
                      fields=removeUserFields
                      actions=removeUserActions
                      onSubmit=onRemoveUserSubmit
                    }}
                    {{/Form}}
                  </dialog>
                  {{{Button
                    variant="text"
                    label="Remove chat"
                    title="Удалить чат"
                    onClick=removeChatHandle
                  }}}
                </div>
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
