import Block from "../../utils/Block";
import styles from "./index.pcss";
import profile from "../../mock/profileFieldList";
import passwordFields from "../../mock/passwordFieldList";
import { IButtonConstructorProps } from "../../components/Button";
import AuthController from "../../controllers/AuthController";

interface IProfilePageProps {
  profileFields: Record<string, unknown>;
  passwordFields: Record<string, unknown>;
  actions: Record<string, IButtonConstructorProps>;
  saveProfileHandle: () => void;
  savePasswordHandle: () => void;
  showEditAvatarDialog: () => void;
  hideEditAvatarDialog: () => void;
  showProfileEditForm: boolean;
  showPasswordEditForm: boolean;
  openEditAvatarDialog: boolean;
  avatar: string;
}
export default class ProfilePage extends Block<IProfilePageProps> {
  constructor() {
    document.title = "Chokak - Settings";
    const { avatar, ...profileFields } = profile;
    const user = {
      id: 142665,
      first_name: "First",
      second_name: "Second",
      display_name: null,
      login: "olololo",
      avatar: null,
      email: "olololo@kachalova.ru",
      phone: "89008007060"
    };

    Object.keys(user).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(profileFields, key))
        profileFields[key].value = user[key];
    });

    super({
      profileFields,
      passwordFields,
      actions: {
        editData: {
          label: "Изменить данные",
          onClick: () => {
            this.setProps({ showProfileEditForm: true });
            // console.log();
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
            AuthController.logout();
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
                {{#Link to="/messenger" class="${styles.prev_arrow}"}}➜{{/Link}}
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
                <section {{#unless showPasswordEditForm}}hidden{{/unless}}>
                  {{#Form
                    fields=passwordFields
                    onSubmit=savePasswordHandle
                    className="${styles.section}"
                  }}
                    {{{Button label="Сохранить" type="submit"}}}
                  {{/Form}}
                </section>
                <section {{#if showPasswordEditForm}}hidden{{/if}}>
                  {{#Form
                    fields=profileFields
                    onSubmit=saveProfileHandle
                    readonly=${!showProfileEditForm}
                    className="${styles.section}"
                  }}
                    {{#if showProfileEditForm}}
                      {{{Button label="Сохранить" type="submit"}}}
                    {{/if}}
                  {{/Form}}
                </section>
                <footer class="${styles.section}">
                    {{#unless ${showPasswordEditForm || showProfileEditForm}}}
                        {{#each actions}}
                            {{{Button
                                label=label
                                onClick=onClick
                                color=color
                            }}}
                        {{/each}}
                    {{/unless}}
                </footer>
            </main>
        </div>`;
  }
}
