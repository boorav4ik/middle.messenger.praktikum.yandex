import Handlebars, { HelperOptions } from "handlebars";
import Block from "./Block";
import templateComponent from "./templateComponent";

export function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(Component.name, function ({ hash, data, fn }: HelperOptions) {
    data.root.children ??= {};
    data.root.refs ??= {};

    const { children } = data.root;

    const component = new Component(hash);

    if (hash.ref) {
      data.root.refs[hash.ref] = component;
    }

    children[component.id] = component;

    return templateComponent(component.id, fn ? fn(this) : "");
  });
}
 