import { Block } from "../../utils/Block";
import styles from "./card.pcss";

interface ICardProps {
  title: string;
}

export class Card extends Block<ICardProps> {
  render() {
    return `
            <div class="${styles.card}">
                <h1 class="${styles.card__title}>{{title}}</h1>
            </div>
        `;
  }
}
