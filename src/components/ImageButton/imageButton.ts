import { Block } from "../../utils/Block";
import styles from "./imageButton.pcss";
import templates from "./imageButton.hbs";

interface IImageComponentButtonProps {
  image: string;
  label?: string;
  onClick: () => void;
}

export class ImageButton extends Block {
  constructor({ onClick, ...props }: IImageComponentButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return this.compile(templates, { ...this.props, styles });
  }
}
