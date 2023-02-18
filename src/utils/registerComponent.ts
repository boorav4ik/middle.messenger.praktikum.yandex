/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import Handlebars, { HelperOptions } from "handlebars";
import { Block } from "./Block";
import { templateComponent } from "./templateComponent";

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, function helperDelegate({ hash, data, fn }: HelperOptions) {
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
