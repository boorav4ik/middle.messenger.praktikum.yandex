import Block from '../../utils/Block';
import Validator, { ValidationType } from '../../utils/Validator';
import { IInputProps } from '../Input/input';
import styles from './textField.pcss';

interface ITextFieldProps extends IInputProps {
  label: string;
  name: string;
  validationType?: ValidationType;
  type?: string;
  readonly?: boolean;
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
          const [isValid, text] = Validator.validate(validationType, value);
          this.refs.error.setProps({ isValid, text });
        }
      },
    });
  }

  render() {
    return `<div class="${styles['labeled-input']}>
            <label
                class="${styles['labeled-input__label']}"
                for="{{ name }}"
            >
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
            }}}
            {{{Error
                text="Невалидное значение"
                isValid=true
                ref="error"
            }}}
        </div>`;
  }
}
