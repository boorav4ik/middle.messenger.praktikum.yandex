import Block from "../../utils/Block";
import template from "./button.hbs";

export interface IButtonProps {
  label: string;
  type: string;
  className?: string;
  onClick?: (e: PointerEvent) => void;
}

export default class Button extends Block {
  constructor(props: IButtonProps) {
    const { onClick, ...rest } = props;
    super("button", { ...rest, events: { click: onClick } });
  }

  render() {
    return this.compile(template, { label: this.props.label });
  }
}
