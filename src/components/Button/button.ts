import Block from "../../utils/Block";
import styles from "./button.pcss";

interface IButtonProps {
  label: string;
  onClick?: () => void;
}

export class Button extends Block {
  constructor({ label, onClick }: IButtonProps) {
    super({ label, events: { click: onClick } });
  }

  render() {
    return `
        <button class="${styles.button}" type="button">
            {{ label }}
        </button>
    `;
  }
}
