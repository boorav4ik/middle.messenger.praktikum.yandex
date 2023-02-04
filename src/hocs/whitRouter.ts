import Block from "../utils/Block";
import Router from "../utils/Router";

export function withRouter(Component: typeof Block<any>) {
  return class WithRouter extends Component {
    public static componentName = Component.componentName || Component.name;

    constructor(props: any) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
