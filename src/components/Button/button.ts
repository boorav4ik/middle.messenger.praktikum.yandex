import Block from "../../utils/Block";
import styles from "./button.pcss";

interface IButtonProps {
  label: string;
  events: {
    click: () => void;
  };
  type?: string;
  color: string;
}

export interface IButtonConstructorProps {
  label: string;
  onClick?: () => void;
  type?: string;
  color?: string;
}

export class Button extends Block<IButtonProps> {
  constructor({
    onClick = () => undefined,
    type = "button",
    color,
    ...props
  }: IButtonConstructorProps) {
    super({ ...props, type, color: color ?? "primary", events: { click: onClick } });
  }

  render() {
    return `
        <button class="${styles.button} ${styles[this.props.color]}" type=type>
            {{ label }}
        </button>
    `;
  }
}
