import Block from "../../utils/Block";
import styles from "./input.pcss";

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

export interface IInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  events: {
    focus?: (event: FocusEvent) => void;
    input?: (event: InputEvent) => void;
    blur?: (event: FocusEvent) => void;
  };

  readonly?: boolean;
}
export class Input extends Block<IInputProps> {
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
    return `
            <input
                class="${styles.input}{{#if className}} {{ className }}{{/if}}"
                {{#if type}}type="{{ type }}"{{/if}}
                name="{{ name }}"
                {{#if placeholder}}placeholder="{{ placeholder }}"{{/if}}
                {{#if readonly}}readonly{{/if}}
            />
        `;
  }
}
