import { v4 as makeId } from "uuid";
import Handlebars from "handlebars";
import { EventBus } from "./EventBus";

enum BlockEvent {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render"
}

export class Block<Props extends Record<string, any> = any> {
  public id = makeId();

  private _element: HTMLElement | null = null;

  protected props: Props;

  // eslint-disable-next-line no-use-before-define
  public children: Record<string, Block | Block[]>;

  private eventBus: () => EventBus<Props>;

  // eslint-disable-next-line no-use-before-define
  protected refs: Record<string, Block> = {};

  public static componentName?: string;

  constructor(propsAndChildren: Props) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(BlockEvent.INIT);
  }

  // eslint-disable-next-line class-methods-use-this
  getChildren(propsAndChildren: Props): {
    props: Props;
    children: Record<string, Block | Block[]>;
  } {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as Props, children };
  }

  _registerEvents(eventBus: EventBus<Props>) {
    eventBus.on(BlockEvent.INIT, this.init.bind(this));
    eventBus.on(BlockEvent.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BlockEvent.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BlockEvent.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(BlockEvent.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount = () => undefined;

  dispatchComponentDidMount() {
    this.eventBus().emit(BlockEvent.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(BlockEvent.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    const templateString = this.render();
    const fragment = this.compile(templateString, { ...this.props });
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): string {
    return "";
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value: any) {
        const oldProps = { ...target };

        // eslint-disable-next-line no-param-reassign
        target[prop as keyof Props] = value;
        self.eventBus().emit(BlockEvent.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _removeEvents() {
    const { events } = this.props as Props;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(
        event as keyof HTMLElementEventMap,
        listener as EventListenerOrEventListenerObject
      );
    });
  }

  _addEvents() {
    const { events } = this.props as Props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(
        event as keyof HTMLElementEventMap,
        listener as EventListenerOrEventListenerObject
      );
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(templateString: string, context: any) {
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    console.log({ templateString });

    const template = Handlebars.compile(templateString);
    console.log(template);

    const htmlString = template({
      ...context,
      children: this.children,
      refs: this.refs
    });
    fragment.innerHTML = htmlString;

    const getStub = (id: string): Element | null =>
      fragment.content.querySelector(`[data-id="id-${id}"]`);

    function stubReplace(child: Block) {
      const stub = getStub(child.id);
      if (!stub) return;
      const content = child.getContent()!;
      stub.replaceWith(content);
      if (stub.childNodes.length) {
        content.append(...stub.childNodes);
      }
    }

    Object.values(this.children).forEach((child) =>
      Array.isArray(child) ? child.forEach(stubReplace) : stubReplace(child)
    );

    return fragment.content;
  }
}
