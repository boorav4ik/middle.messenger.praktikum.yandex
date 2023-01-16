import Block from "../utils/Block";
import store from "../utils/Store";
import StoreEvents from "../utils/types/StoreEvents";
import isEqual from "../utils/functions/isEqual";
import PlainObject from "../utils/types/PlainObject";

export function whitStore(mapStateToProps: (state: any) => any) {
  return (Component: typeof Block) => {
    let oldProps: PlainObject;
    return class WhitSrore extends Component {
      constructor(props) {
        oldProps = store.getState(mapStateToProps);

        super({ ...props, ...oldProps });
        store.on(StoreEvents.Updated, () => {
          const newProps = store.getState(mapStateToProps);
          if (isEqual(oldProps, newProps)) return;
          oldProps = newProps;
          this.setProps({ ...newProps });
        });
      }
    };
  };
}
