import Block from "../../utils/Block";
import template from "./profile.hbs";
import Form, { IFormProps } from "../../components/Form";

import profileData from "./profileData.json";
import "./index.css";
import Avatar from "../../components/Avatar";

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
    const { profileFields, passwordChangeFields } = this.props.profileData;
    const children = this.children;
    if (Array.isArray(profileFields))
      this.children.profileSettingsForm = new Form({
        fields: profileFields,
        actions: [
          {
            label: "Изменить данные",
            type: "button",
            className: "primary text",
            onClick: function onChengeDataClick(event: Event) {
              event.stopPropagation();
              const { profileSettingsForm } = children;
              if (profileSettingsForm instanceof Block)
                profileSettingsForm.setProps({ readonly: false });
            },
          },
          {
            label: "Изменить пароль",
            type: "button",
            className: "primary text",
            onClick() {
              console.log("Изменить пароль");
            },
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
  }

  render() {
    return this.compile(template, this.props);
  }
}
