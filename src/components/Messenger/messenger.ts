import MessagesController from "../../controllers/MessagesController";
import { Block } from "../../utils/Block";
import styles from "./messenger.pcss";

export class Messenger extends Block {
  constructor() {
    super({
      onSendMessageClick: () => {
        const input = this.refs.input.getContent() as HTMLInputElement;
        const content = input.value;
        if (content.length) MessagesController.sendMessage(content);
        input.value = "";
      }
    });
  }

  render() {
    return `
      <div class=${styles.container}>
      {{{Input
        type="text"
        placeholder="Сообщение"
        name="message"
        ref="input"
        }}}
        {{{Button
          type="button"
          label="➜"
          onClick=onSendMessageClick
          circle=true
        }}}
      </div>
      `;
  }
}
