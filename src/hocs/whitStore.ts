import Block from "../utils/Block";
import store from "../utils/Store";
import StoreEvents from "../utils/types/StoreEvents";

export function whitStore(mapStateToProps: (state: any) => any) {
  return (Component: typeof Block) => {
    return class WhitSrore extends Component {
      constructor(props) {
        const state = mapStateToProps(store.getState());
        super({ ...props, ...state });
        state.on(StoreEvents.Updated, () => {
          this.setProps({ ...mapStateToProps(store.getState()) });
        });
      }
    };
  };
}
