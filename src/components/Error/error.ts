import Block from "../../utils/Block";
import styles from "./error.pcss";

interface IErrorProps {
  isValid: boolean;
  text?: string;
}
export class Error extends Block<IErrorProps> {
  render() {
    if (this.props.isValid) return "<div />";
    return `
            <div class="${styles.error}">
                {{ text }}
            </div>
        `;
  }
}
