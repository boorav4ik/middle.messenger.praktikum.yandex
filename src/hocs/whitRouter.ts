import { Block } from "utils/Block";
import { router } from "utils/Router";

export function withRouter(Component: typeof Block<any>) {
  return class WithRouter extends Component {
    public static componentName = Component.componentName || Component.name;

    constructor(props: any) {
      super({ ...props, router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof router;
}
