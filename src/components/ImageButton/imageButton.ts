import { Block } from "../../utils/Block";
import styles from "./imageButton.pcss";

interface IImageComponentButtonProps {
  image: string;
  label?: string;
  onClick: () => void;
}

interface IImageButtonProps {
  image: string;
  label?: string;
  events: {
    click: () => void;
  };
  className?: string;
}

export class ImageButton extends Block<IImageButtonProps> {
  constructor({ onClick, ...props }: IImageComponentButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
        <button
          class="${styles.image_button}${this.props.className ? ` ${this.props.className}` : ""}"
          type="button"
        >
          <img src="{{image}}" class="${styles.image_button__image}" title="{{label}}"/>
          <p class="${styles.image_button__label}">{{ label }}</p>
        </button>
    `;
  }
}
