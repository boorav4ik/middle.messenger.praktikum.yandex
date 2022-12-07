import Block from "../../utils/Block";
import template from "./profile.hbs";
import Form from "../../components/Form";
import Button from "../../components/Button";
import profileData from "./profileData.json";
import "./index.css";
import Avatar from "../../components/Avatar";
import FormInput, { IFormInputProps } from "../../components/FormInput";

export default class ProfilePage extends Block {
  constructor() {
    super("div", {
      profileData,
      className: "profile_wrapper flex-row h-100",
    });
  }

  init() {
    document.title = "Профиль";

    this.children.avatar = new Avatar({
      size: "xx-large",
      label: "Поменять аватар",
    });

    const profileFieldsList = this.props.profileData as Record<
      string,
      IFormInputProps[]
    >;

    const { profileFields, passwordChangeFields } = profileFieldsList;
    const profileSettingsForm = new Form({
      fields: profileFields,
      actions: [
        {
          label: "Изменить данные",
          type: "button",
          className: "primary text",
          onClick: onChengeDataClick,
        },
        {
          label: "Изменить пароль",
          type: "button",
          className: "primary text",
          onClick: onChengePasswordClick,
        },
        {
          label: "Выйти",
          type: "button",
          className: "error text",
          onClick() {
            location.replace("/chats");
          },
        },
      ],
      variant: "inline",
      readonly: true,
    });

    this.children.profileSettingsForm = profileSettingsForm;

    const passwordChangeForm = new Form({
      fields: passwordChangeFields,
    });
    passwordChangeForm.hide();

    function onChengeDataClick(event: Event) {
      const buttons = profileSettingsForm.children.buttons as Block[];
      buttons.forEach((button) => button.hide());
      profileSettingsForm.setProps({ readonly: false });
      const [firstInput] = profileSettingsForm.children.inputs as Block[];
      if (firstInput instanceof FormInput) firstInput.focus();
      saveButton.show();
    }

    function onChengePasswordClick(event: Event) {
      profileSettingsForm.hide();
      passwordChangeForm.show();
      saveButton.show();
    }

    function onSaveButtonClick(event: Event) {
      saveButton.hide();
      passwordChangeForm.hide();
      const buttons = profileSettingsForm.children.buttons as Block[];
      buttons.forEach((button) => button.show());
      profileSettingsForm.show();
      profileSettingsForm.setProps({ readonly: true });
    }

    this.children.passwordChangeForm = passwordChangeForm;
    const saveButton = new Button({
      label: "Сохранить",
      type: "button",
      onClick: onSaveButtonClick,
    });

    saveButton.hide();
    this.children.saveButton = saveButton;
  }

  render() {
    return this.compile(template, this.props);
  }
}
