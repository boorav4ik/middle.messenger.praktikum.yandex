import { Block } from "../../utils/Block";
import styles from "./listWithScroll.pcss";
import template from "./listWithScroll.hbs";

export class ListWithScroll extends Block {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
