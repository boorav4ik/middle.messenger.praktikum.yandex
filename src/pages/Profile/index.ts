import { Block } from "../../utils/Block";
import { IButtonConstructorProps } from "../../components/Button";
import { withUser } from "../../hocs/withUser";
import { controller } from "../../controllers/AuthController";
import { User } from "../../api/interfaces";
import { profileFieldList } from "../../mock/profileFieldList";
import { passwordFieldList } from "../../mock/passwordFieldList";
import styles from "./index.pcss";
import template from "./index.hbs";

class ProfilePage extends Block {
  constructor(user: User) {
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
      user
    });
  }

  render() {
    const { showProfileEditForm, showPasswordEditForm } = this.props;

    return this.compile(template, {
      ...this.props,
      styles,
      showAvatar: !(showProfileEditForm || showPasswordEditForm),
      showSaveButton: showProfileEditForm || showPasswordEditForm,
      redonlyProfile: !showProfileEditForm
    });
  }
}
const ProfilePageWithUser = withUser(ProfilePage as typeof Block);

export { ProfilePageWithUser as ProfilePage };
