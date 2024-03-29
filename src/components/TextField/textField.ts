import { Block } from "../../utils/Block";
import { validator, ValidationType } from "../../utils/Validator";
import { IInputConstructorProps } from "../Input";
import styles from "./textField.pcss";

export interface ITextFieldProps extends IInputConstructorProps {
  label: string;
  value?: string;
  validationType?: ValidationType;
  required?: boolean;
}

export class TextField extends Block<ITextFieldProps> {
  constructor({ validationType, ...props }: ITextFieldProps) {
    super({
      ...props,
      onBlur: (event: FocusEvent): void => {
        if (this.props.readonly) return;
        const input = event.target as HTMLInputElement;
        const { value } = input;
        if (validationType) {
          const [isValid, text] = validator.validate(validationType, value);
          this.refs.error.setProps({ isValid, text });
        }
      }
    });
  }

  getRefs() {
    return this.refs;
  }

  render() {
    return `<div class="${styles.labeled__input}">
      <label class="${styles.labeled__inpu__label}" for="{{ name }}">
        {{ label }}
      </label>
      {{{Input
        type=type
        name=name
        placeholder=placeholder
        onFocus=onFocus
        onBlur=onBlur
        onInput=onInput
        readonly=readonly
        ref="input"
        required=required
      }}}
      {{{Error
        text="Невалидное значение"
        isValid=true
        ref="error"
      }}}
    </div>`;
  }
}
