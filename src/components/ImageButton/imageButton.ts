import Block from '../../utils/Block';
import styles from './imageButton.pcss';

interface IImageButtonProps {
  image: string;
  label?: string;
  onClick?: () => void;
  type?: string;
  color?: string;
  size?: string;
}

export class ImageButton extends Block {
  constructor({ onClick, type = 'button', ...props }: IImageButtonProps) {
    super({ ...props, type, events: { click: onClick } });
  }

  render() {
    console.log(styles);

    return `
        <button
          class="${styles.image_button}{{#size}} ${
  styles[this.props.size]
}{{/size}}{{#color}} ${styles[this.props.color]}{{/color}}"
          type="button"
        >
          <img src="{{image}}" title="{{label}}"/>
          <p>{{ label }}</p>
        </button>
    `;
  }
}
