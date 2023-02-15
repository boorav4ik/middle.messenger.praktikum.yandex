import { Block } from "../../utils/Block";
import styles from "./error.pcss";
import template from "./error.hbs";

export class Error extends Block {
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
