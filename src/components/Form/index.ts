import Block from "../../utils/Block";
import Button, { IButtonProps } from "../Button";
import Input, { IInputProps } from "../Input";
import template from "./form.hbs";
import "./index.css";

interface IFormProps {
  title: string;
  fields: IInputProps[];
  actions: IButtonProps[];
}

export default class Form extends Block {
  constructor(props: IFormProps) {
    super("form", props);
  }

  init() {
    const { fields, actions } = this.props;
    this.children.inputs = fields.map((field: IInputProps) => new Input(field));
    this.children.buttons = actions.map(
      (action: IButtonProps) => new Button(action)
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
