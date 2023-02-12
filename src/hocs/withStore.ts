import { Block } from "../utils/Block";
import { store, IState } from "../utils/Store";
import { StoreEvents } from "../utils/types/StoreEvents";
import isEqual from "../utils/functions/isEqual";
import { PlainObject } from "../utils/types/PlainObject";

export function withStore<SP>(mapStateToProps: (state: IState) => SP) {
  return <P extends Record<string, any>>(Component: typeof Block<P & SP>) => {
    return class WhitSrore extends Component {
      public static componentName = Component.componentName || Component.name;

      constructor(props: P) {
        let oldProps = mapStateToProps(store.getState());

        super({ ...props, ...oldProps });
        store.on(StoreEvents.Updated, () => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const state = store.getState();
          const newProps = mapStateToProps(state);
          if (isEqual(oldProps as PlainObject, newProps as PlainObject)) return;
          oldProps = newProps;
          this.setProps({ ...newProps });
        });
      }
    };
  };
}
