import { Block } from "../../utils/Block";
import styles from "./button.pcss";
import template from "./button.hbs";

export interface IButtonConstructorProps {
  label: string;
  onClick?: () => void;
  type?: string;
  color?: string;
  circle?: boolean;
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
    const className = `${styles.button} ${styles[this.props.color]}`.concat(
      ` ${this.props.className ?? ""}`
    );

    return this.compile(template, { ...this.props, styles, className });
  }
}
