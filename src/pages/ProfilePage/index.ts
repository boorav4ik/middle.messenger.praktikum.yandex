import Block from "../../utils/Block";
import template from "./profile.hbs";
import Form, { IFormProps } from "../../components/Form";

import profileData from "./profileData.json";
import "./index.css";
import { IInputProps } from "../../components/Input";

export default class ProfilePage extends Block {
  constructor() {
    super("div", {
      profileData,
      className: "profile_wrapper",
    });
  }

  init() {
    document.title = "Профиль";
    const { profileFields } = this.props.profileData;
    console.log(profileFields);

    // console.log(profileFields, passwordChangeFields);
    this.children.profileSettingsForm = new Form({
      fields: profileFields,
    });
    // this.children.profileSettingsForm = new Form({
    //   fields: this.props.profileFields,
    // });
    // this.children.passwordChangeForm = new Form({
    //   fields: this.props.passwordChangeFields,
    // });
  }

  render() {
    return this.compile(template, this.props);
  }
}
