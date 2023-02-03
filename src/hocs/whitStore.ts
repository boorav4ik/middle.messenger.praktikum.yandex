import Block from "../utils/Block";
import store from "../utils/Store";
import StoreEvents from "../utils/types/StoreEvents";
import isEqual from "../utils/functions/isEqual";
import PlainObject from "../utils/types/PlainObject";

export function whitStore(mapStateToProps: (state: any) => any) {
  return (Component: typeof Block) => {
    return class WhitSrore extends Component {
      constructor(props) {
        const state = store.getState();
        console.log("constructor:", { state });
        let oldProps = mapStateToProps(state);
        super({ ...props, ...oldProps });
        store.on(StoreEvents.Updated, () => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const state = store.getState();
          console.log("store.on", { state });
          const newProps = mapStateToProps(state);
          if (isEqual(oldProps, newProps)) return;
          oldProps = newProps;
          console.log({ newProps });

          this.setProps({ ...newProps });
        });
        console.log("!!!!", store);
      }
    };
  };
}
