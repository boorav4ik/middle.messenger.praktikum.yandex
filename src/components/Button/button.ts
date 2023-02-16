import { Block } from "../../utils/Block";
import styles from "./button.pcss";

export interface IButtonConstructorProps {
  label: string;
  onClick?: () => void;
  type?: string;
  color?: string;
  circle?: boolean;
  title?: string;
  variant?: string;
}

export class Button extends Block {
  constructor({
    onClick = () => undefined,
    type = "button",
    color,
    ...props
  }: IButtonConstructorProps) {
    super({ ...props, type, color: color ?? "primary", events: { click: onClick } });
  }

  render() {
    const className = `${styles.button} ${styles[this.props.color]}`
      .concat(` ${this.props.className ?? ""}`)
      .concat(
        this.props.variant && this.props.variant in styles ? ` ${styles[this.props.variant]}` : ""
      );

    return `
        <button
          class="${className}{{#circle}} ${styles.circle}{{/circle}}"
          type={{type}}
          {{#title}}title="{{this}}"{{/title}}
        >
            {{ label }}
        </button>
    `;
  }
}
