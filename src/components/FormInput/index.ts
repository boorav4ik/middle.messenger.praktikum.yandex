import Block from "../../utils/Block";
import template from "./input.hbs";
import "./index.css";

export interface IFormInputProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  variant?: "inline" | "animated";
  readonly?: boolean;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export default class FormInput extends Block {
  constructor({ onFocus, onBlur, type, ...props }: IFormInputProps) {
    super("li", {
      ...props,
      className:
        props.variant === "inline" ? "inline w-100 b-divider" : "text__field",
      inputType: type,
      events: { focus: onFocus, blur: onBlur },
    });
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
      inputType: this.props.inputType,
      value: this.props.value,
      placeholder: this.props.placeholder,
      variant: this.props.variant,
      readonly: this.props.readonly,
    });
  }
}
