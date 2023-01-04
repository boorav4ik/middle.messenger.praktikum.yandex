import Block from "../../utils/Block";
import styles from "./attachInput.pcss";

interface IAttachInputProps {
  icon?: string;
  label?: string;
}
export class AttachInput extends Block<IAttachInputProps> {
  render() {
    return `<label for="attach" class="${styles.label}">
            {{#icon}}<img src={{this}} class="${styles.medium}" />{{/icon}}
            {{#label}}{{this}}{{/label}}
            <input type="file" name="attach" id="attach" class="${styles.attach}" />
        </label>`;
  }
}
