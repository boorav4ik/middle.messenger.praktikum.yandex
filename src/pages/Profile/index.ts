import { Block } from "../../utils/Block";
import { IButtonConstructorProps } from "../../components/Button";
import { withUser } from "../../hocs/withUser";
import { controller } from "../../controllers/AuthController";
import { controller as userController } from "../../controllers/UserController";
import { User } from "../../api/interfaces";
import { profileFieldList } from "../../mock/profileFieldList";
import { passwordFieldList } from "../../mock/passwordFieldList";
import styles from "./index.pcss";

interface IProfilePageProps {
  profileFields: Record<string, unknown>;
  passwordFields: Record<string, unknown>;
  actions: Record<string, IButtonConstructorProps>;
  saveProfileHandle: (data: Record<string, string>) => void;
  savePasswordHandle: (data: Record<string, string>) => void;
  showEditAvatarDialog: () => void;
  hideEditAvatarDialog: () => void;
  showProfileEditForm: boolean;
  showPasswordEditForm: boolean;
  openEditAvatarDialog: boolean;
  uploadUserAvatar: (event: SubmitEvent) => void;
  hidePasswordEditForm: () => void;
  hideProfileEditForm: () => void;
}

class ProfilePage extends Block<IProfilePageProps & { user: User }> {
  constructor({ user }: { user: User }) {
    document.title = "Chokak - Settings";

    super({
      profileFields: profileFieldList,
      passwordFields: passwordFieldList,
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
            controller.logout();
          }
        }
      },
      saveProfileHandle: (data) => {
        const requiredFields = [
          "first_name",
          "second_name",
          ["display_name", this.props.user.login],
          "login",
          "email",
          "phone"
        ];

        if (Object.keys(data).length)
          userController.uploadProfile(
            requiredFields.reduce((profile, field) => {
              const [key, value] = typeof field === "string" ? [field] : field;
              return {
                ...profile,
                [key]: data[key] ?? this.props.user[key as keyof User] ?? value
              };
            }, {})
          );
        this.setProps({ showProfileEditForm: false });
      },
      savePasswordHandle: (data) => {
        if (Object.keys(data).length === 3) {
          userController.uploadPassword({
            newPassword: data.newPassword,
            oldPassword: data.oldPassword
          });
          this.setProps({ showPasswordEditForm: false });
        }
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
      uploadUserAvatar: ({ target }) => {
        if (!target) return;
        const data = new FormData(target as HTMLFormElement);
        userController.uploadAvatar(data);
        this.setProps({ openEditAvatarDialog: false });
      },
      hidePasswordEditForm: () => {
        this.setProps({ showPasswordEditForm: false });
      },
      hideProfileEditForm: () => {
        this.setProps({ showProfileEditForm: false });
      },
      user
    });
  }

  render() {
    const {
      showProfileEditForm,
      showPasswordEditForm,
      user: { avatar }
    } = this.props;
    const avatarUrl = avatar ? `https://ya-praktikum.tech/api/v2/resources/${avatar}` : "";

    return `<div class="${styles.profile_page_conteiner}">
            <aside class="${styles.aside}">
                {{#Link to="/messenger" class="${styles.prev_arrow}"}}➜{{/Link}}
            </aside>
            <main class="${styles.main}">
                {{#unless ${showPasswordEditForm || showProfileEditForm}}}
                    <section>
                        {{{ImageButton
                            label="Поменять аватар"
                            image="${avatarUrl}"
                            onClick=showEditAvatarDialog
                        }}}
                        <dialog {{#openEditAvatarDialog}}open{{/openEditAvatarDialog}}>
                          <h1>Загрузите фаил</h1>
                          {{#Form onSubmit=uploadUserAvatar}}
                            <label for="avatar" title="Выберете файл">
                            </label>
                            <input
                              type="file"
                              id="avatar"
                              name="avatar"
                            />
                            {{{Button
                              label="Сохранить"
                              type="submit"
                            }}}
                            {{{Button
                              label="Отмена"
                              onClick=hideEditAvatarDialog
                              color="secondary"}}}
                          {{/Form}}
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
                    {{{Button
                      label="Отмена"
                      onClick=hidePasswordEditForm
                      color="secondary"}}}
                  {{/Form}}
                </section>
                <section {{#if showPasswordEditForm}}hidden{{/if}}>
                  {{#Form
                    fields=profileFields
                    values=user
                    onSubmit=saveProfileHandle
                    readonly=${!showProfileEditForm}
                    className="${styles.section}"
                  }}
                    {{#if showProfileEditForm}}
                      {{{Button label="Сохранить" type="submit"}}}
                      {{{Button
                        label="Отмена"
                        onClick=hideProfileEditForm
                        color="secondary"}}}
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

const ProfilePageWithUser = withUser(ProfilePage as typeof Block);

export { ProfilePageWithUser as ProfilePage };
