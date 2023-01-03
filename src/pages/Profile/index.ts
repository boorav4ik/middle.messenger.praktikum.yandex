import Block from "../../utils/Block";
import styles from "./index.pcss";
import profile from "../../mock/profileFieldList";
import passwordFields from "../../mock/passwordFieldList";

export default class ProfilePage extends Block {
  constructor() {
    const { avatar, ...profileFields } = profile;
    super({
      profileFields,
      passwordFields,
      actions: {
        editData: {
          label: "Изменить данные",
          onClick: () => {
            this.setProps({ showProfileEditForm: true });
          },
          color: "primary"
        },
        editPassword: {
          label: "Изменить пароль",
          color: "primary",
          onClick: () => {
            this.setProps({ showPasswordEditForm: true });
          }
        },
        exit: {
          label: "Выйти",
          color: "error",
          onClick: () => {
            location.replace("/chats");
          }
        }
      },
      saveProfileHandle: () => {
        this.setProps({ showProfileEditForm: false });
      },
      savePasswordHandle: () => {
        this.setProps({ showPasswordEditForm: false });
      },
      showEditAvatarDialog: () => {
        this.setProps({ openEditAvatarDialog: true });
      },
      hideEditAvatarDialog: () => {
        this.setProps({ openEditAvatarDialog: false });
      },
      showProfileEditForm: false,
      showPasswordEditForm: false,
      openEditAvatarDialog: false,
      avatar
    });
  }

  render() {
    const { showProfileEditForm, showPasswordEditForm } = this.props;
    return `<div class="${styles.profile_page_conteiner}">
            <aside class="${styles.aside}">
                {{#Link to="/chats" class="${styles.prev_arrow}"}}➜{{/Link}}
            </aside>
            <main class="${styles.main}">
                {{#unless ${showPasswordEditForm || showProfileEditForm}}}
                    <section>
                        {{{ImageButton
                            label="Поменять аватар"
                            image=avatar
                            onClick=showEditAvatarDialog
                        }}}
                        <dialog
                            class="${styles.dialog}"
                            {{#openEditAvatarDialog}}open{{/openEditAvatarDialog}}
                        >
                            <h1>Загрузите фаил</h1>
                            <form method="dialog">
                                {{{AttachInput label="Выбрать файл на компьютере"}}}
                                {{{Button
                                    label="Сохранить"
                                    onClick=hideEditAvatarDialog
                                }}}
                            </form>
                        </dialog>
                    </section>
                {{/unless}}
                {{#if showPasswordEditForm}}
                    <section class="${styles.section}">
                        <ul>
                            {{#each passwordFields}}
                                <li>
                                    {{{TextField
                                        label=this.label
                                        type="password"
                                        name=@key
                                        validationType="password"
                                    }}}
                                </li>
                            {{/each}}
                        </ul>
                        {{{Button label="Сохранить" onClick=savePasswordHandle}}}
                    </section>
                {{else}}
                <section class="${styles.section}">
                    <ul>
                        {{#each profileFields}}
                            <li>
                                {{{TextField
                                    label=this.label
                                    name=@key
                                    validationType=this.validation
                                    type=this.type
                                    readonly=${!showProfileEditForm}
                                    placeholder=this.value
                                }}}
                            </li>
                        {{/each}}
                    </ul>
                    {{#if showProfileEditForm}}
                        {{{Button label="Сохранить" onClick=saveProfileHandle}}}
                    {{/if}}
                </section>
                {{/if}}
                <footer class="${styles.section}">
                    {{#unless ${showPasswordEditForm || showProfileEditForm}}}
                        {{#each actions}}
                            {{{Button
                                label=this.label
                                onClick=this.onClick
                            }}}
                        {{/each}}
                    {{/unless}}
                </footer>
            </main>
        </div>`;
  }
}
