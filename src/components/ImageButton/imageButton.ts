import Block from "../../utils/Block";
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
}
export class ImageButton extends Block<IImageButtonProps> {
  constructor({ onClick, ...props }: IImageComponentButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
        <button
          class="${styles.image_button}"
          type="button"
        >
          <img src="{{image}}" title="{{label}}"/>
          <p>{{ label }}</p>
        </button>
    `;
  }
}
