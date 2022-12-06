import Block from "../../utils/Block";
import Button, { IButtonProps } from "../Button";
import Input, { IFormInputProps } from "../FormInput";
import template from "./form.hbs";
import "./index.css";

export interface IFormProps {
  title?: string;
  variant?: "inline" | "animated";
  readonly?: boolean;
  fields: IFormInputProps[];
  actions?: IButtonProps[];
}

export default class Form extends Block {
  constructor(props: IFormProps) {
    super("form", {
      ...props,
      className: props.variant === "inline" ? "w-100" : undefined,
    });
  }

  init() {
    console.log(this.props.readonly);

    const variant = this.props.variant === "animated" ? "animated" : "inline";
    const readonly = Boolean(this.props.readonly);
    if (Array.isArray(this.props.fields))
      this.children.inputs = this.props.fields.map(
        (field: IFormInputProps) =>
          new Input({ ...field, variant: variant, readonly })
      );

    if (Array.isArray(this.props.actions))
      this.children.buttons = this.props.actions.map(
        (action: IButtonProps) => new Button(action)
      );
  }

  render() {
    const {
      props: { readonly },
      children: { inputs },
    } = this;
    if (Array.isArray(inputs))
      inputs.forEach((input) => input.setProps({ readonly }));
    return this.compile(template, this.props);
  }
}
