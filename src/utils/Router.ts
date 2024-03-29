import { Block } from "./Block";
import { Route } from "./Route";
import { PlainObject } from "./types/PlainObject";

class Router {
  // eslint-disable-next-line no-use-before-define
  private static instance: Router;

  private routes: Array<Route> = [];

  private history = window.history;

  private currentRoute: Route | null = null;

  constructor(private readonly rootQuery: string) {
    // eslint-disable-next-line no-constructor-return
    if (Router.instance) return Router.instance;
    Router.instance = this;
  }

  public use(pathname: string, view: typeof Block) {
    const route = new Route(pathname, view, this.rootQuery);
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = () => {
      this.onRoute(window.location.pathname);
    };
    this.onRoute(window.location.pathname);
  }

  public go(pathname: string, state?: PlainObject) {
    this.history.pushState(state ?? {}, "", pathname);
    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) return;

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public reset() {
    this.routes = [];
    this.currentRoute = null;
  }
}

export const router = new Router("#root");
