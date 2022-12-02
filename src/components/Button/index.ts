import Block from "../../utils/Block";
import template from "./button.hbs";

interface IButtonProps {
  label: string;
  className: string;
  onClick: () => void;
}

export default class Button extends Block {
  constructor(props: IButtonProps) {
    const { onClick, ...rest } = props;
    super("button", { ...rest, events: { click: onClick } });
  }

  render() {
    return this.compile(template, this.props);
  }
}
