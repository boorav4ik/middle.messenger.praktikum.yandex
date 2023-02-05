import Block from "../../utils/Block";
import styles from "./button.pcss";

interface IButtonProps {
  label: string;
  events: {
    click: () => void;
  };
  type?: string;
  color: string;
  className?: string;
}

export interface IButtonConstructorProps {
  label: string;
  onClick?: () => void;
  type?: string;
  color?: string;
  circle?: boolean;
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
    const className = `${styles.button} ${styles[this.props.color]}`.concat(
      ` ${this.props.className ?? ""}`
    );

    return `
        <button class="${className}{{#circle}} ${styles.circle}{{/circle}}" type={{type}}>
            {{ label }}
        </button>
    `;
  }
}
