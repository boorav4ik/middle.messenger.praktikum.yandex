import Block from "../../utils/Block";
import styles from "./listWithScroll.pcss";

export class ListWithScroll extends Block {
  protected render(): string {
    return `<div class="${styles.listWithScroll}"></div>`;
  }
}
