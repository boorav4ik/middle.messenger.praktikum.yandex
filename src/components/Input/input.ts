import Block from "../../utils/Block";
import styles from "./input.pcss";

export interface IInputProps {
    name: string;
    type?: string;
    placeholder?: string;
    onFocus?: () => void;
    onInput?: () => void;
    onBlur?: () => void;
}

export class Input extends Block {
    constructor({ onFocus, onInput, onBlur, ...props }: IInputProps) {
        super({
            ...props,
            events: {
                focus: onFocus,
                input: onInput,
                blur: onBlur,
            }
        })
    };

    render() {
        return `
            <input
                class="${styles.input}"
                {{#if type}}type="{{ type }}"{{/if}}
                name="{{ name }}"
                placeholder="{{ placeholder }}"
            />
        `
    }
}