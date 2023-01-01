import Block from '../../utils/Block';
import styles from './card.pcss';

export class Card extends Block {
  render() {
    return `
            <div class="${styles.card}">
                <h1 class="${styles.card__title}>{{title}}</h1>
            </div>
        `;
  }
}
