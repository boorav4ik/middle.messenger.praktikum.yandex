import Block from "../../utils/Block";
import Validator, { ValidationType } from "../../utils/Validator";
import { IInputProps } from "../Input/input";
import styles from "./textField.pcss";

interface ITextFieldProps extends IInputProps {
    label: string;
    validationType?: ValidationType;
}

export class TextField extends Block {
    constructor({ validationType, ...props }: ITextFieldProps) {
        super({
            ...props,
            onBlur: (event: FocusEvent): void => {
                const input = event.target as HTMLInputElement;
                const value = input.value;
                if (validationType) {
                    const [isValid, text] = Validator.validate(validationType, value)
                    this.refs.error.setProps({ isValid, text });
                }
            }
        })
    }

    render() {
        return `
        <div class="${styles['labeled-input']}">
            <label class="${styles['labeled-input__label']}" for="{{ name }}">
                {{ label }}
            </label>
            {{{Input type=type name=name placeholder=placeholder onFocus=onFocus onBlur=onBlur onInput=onInput}}}
            {{{Error text="Невалидное значение" isValid=true ref="error"}}}
    </div>
        `
    }
}
