import Block from "../../utils/Block";
import attachIcon from "../../images/attachIcon.png";
import styles from "./attachInput.pcss";

export class AttachInput extends Block {
    constructor() {
        super({ icon: attachIcon })
    }

    render() {
        return `<label for="attach" class="${styles.label}">
            <img src={{icon}} class="${styles.medium}" />
            <input type="file" name="attach" id="attach" class="${styles.attach}" />
        </label>`
    }
}