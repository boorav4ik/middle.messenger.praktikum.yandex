import Block from "../utils/Block";
import store, { IState } from "../utils/Store";
import StoreEvents from "../utils/types/StoreEvents";
import isEqual from "../utils/functions/isEqual";

export function whitStore<SP>(mapStateToProps: (state: IState) => SP) {
  return <P>(Component: typeof Block<SP & P>) => {
    return class WhitSrore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let oldProps = mapStateToProps(store.getState());

        super({ ...props, ...oldProps });
        store.on(StoreEvents.Updated, () => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const state = store.getState();
          const newProps = mapStateToProps(state);
          if (isEqual(oldProps, newProps)) return;
          oldProps = newProps;
          this.setProps({ ...newProps });
        });
      }
    };
  };
}
