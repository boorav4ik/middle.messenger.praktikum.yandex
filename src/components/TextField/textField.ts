import { Block } from "../../utils/Block";
import { validtor, ValidationType } from "../../utils/Validator";
import { IInputConstructorProps } from "../Input";
import styles from "./textField.pcss";
import template from "./textField.hbs";

export interface ITextFieldProps extends IInputConstructorProps {
  label: string;
  value?: string;
  validationType?: ValidationType;
  required?: boolean;
}

export class TextField extends Block {
  constructor({ validationType, ...props }: ITextFieldProps) {
    super({
      ...props,
      onBlur: (event: FocusEvent): void => {
        if (this.props.readonly) return;
        const input = event.target as HTMLInputElement;
        const { value } = input;
        if (validationType) {
          const [isValid, text] = validtor.validate(validationType, value);
          this.refs.error.setProps({ isValid, text });
        }
      }
    });
  }

  getRefs() {
    return this.refs;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
