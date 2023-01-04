import Block from "../../utils/Block";
import styles from "./link.pcss";

interface ILinkProps {
  to: string;
  class?: string;
}
export class Link extends Block<ILinkProps> {
  render() {
    return `<a
            class="{{#if class}}{{class}}{{else}}{{${styles.link}}}{{/if}}"
            href="{{ to }}"
        >
        </a>`;
  }
}
