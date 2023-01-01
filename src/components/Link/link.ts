import Block from '../../utils/Block';
import styles from './link.pcss';

export class Link extends Block {
  render() {
    return `<a
            class="{{#if class}}{{class}}{{else}}{{${styles.link}}}{{/if}}"
            href="{{ to }}"
        >
        </a>`;
  }
}
