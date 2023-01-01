import Block from '../../utils/Block';
import styles from './button.pcss';

interface IButtonProps {
  label: string;
  onClick?: () => void;
  type?: string;
}

export class Button extends Block {
  constructor({ label, onClick, type = 'button' }: IButtonProps) {
    super({ label, type, events: { click: onClick } });
  }

  render() {
    return `
        <button class="${styles.button}" type="button">
            {{ label }}
        </button>
    `;
  }
}
