import { Block } from "../../utils/Block";
import styles from "./input.pcss";
import template from "./input.hbs";

export interface IInputConstructorProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  onFocus?: (event: FocusEvent) => void;
  onInput?: (event: InputEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  readonly?: boolean;
}

export class Input extends Block {
  constructor({ onFocus, onInput, onBlur, ...props }: IInputConstructorProps) {
    super({
      ...props,
      events: {
        focus: onFocus,
        input: onInput,
        blur: onBlur
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
