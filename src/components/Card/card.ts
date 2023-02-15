import { Block } from "../../utils/Block";
import styles from "./card.pcss";
import template from "./card.hbs";

export class Card extends Block {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
