import Block from "../../utils/Block";
import styles from "./input.pcss";

export interface IInputProps {
    name: string;
    type?: string;
    placeholder?: string;
    className?: string;
    onFocus?: () => void;
    onInput?: () => void;
    onBlur?: () => void;
    readonly?: boolean;
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
                class="${styles.input}{{#if className}} {{ className }}{{/if}}"
                {{#if type}}type="{{ type }}"{{/if}}
                name="{{ name }}"
                {{#if placeholder}}placeholder="{{ placeholder }}"{{/if}}
                {{#if readonly}}readonly{{/if}}
            />
        `
    }
}