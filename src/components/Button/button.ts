import Block from "../../utils/Block";
import styles from "./button.pcss";

interface IButtonProps {
  label: string;
  events: {
    click: () => void;
  };
  type?: string;
}

export interface IButtonConstructorProps {
  label: string;
  onClick: () => void;
  type?: string;
  color?: string;
}

export class Button extends Block<IButtonProps> {
  constructor({ onClick, type = "button", ...props }: IButtonConstructorProps) {
    super({ ...props, type, events: { click: onClick } });
  }

  render() {
    return `
        <button class="${styles.button}" type="button">
            {{ label }}
        </button>
    `;
  }
}
