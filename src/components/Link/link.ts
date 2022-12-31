import Block from "../../utils/Block";
import styles from "./link.pcss";

export class Link extends Block {
    render() {
        return `<a
            class="${styles.link}{{#if class}} {{class}}{{/if}}"
            href="{{ to }}"
        >
        </a>`
    }
}
