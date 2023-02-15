import { Block } from "../../utils/Block";
import styles from "./attachInput.pcss";
import template from "./attachInput.hbs";

export class AttachInput extends Block {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
