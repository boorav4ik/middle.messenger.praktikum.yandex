import { controller } from "../../controllers/MessagesController";
import { Block } from "../../utils/Block";
import styles from "./messenger.pcss";
import template from "./messenger.hbs";

export class Messenger extends Block {
  constructor() {
    super({
      onSendMessageClick: () => {
        const input = this.refs.input.getContent() as HTMLInputElement;
        const content = input.value;
        if (content.length) controller.sendMessage(content);
        input.value = "";
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
