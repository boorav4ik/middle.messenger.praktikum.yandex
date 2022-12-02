import Block from "../../utils/Block";
import template from "./form.hbs";
import "./index.css";

interface IFormPagePage {
  name: string;
  title: string;
  fields: Record<string, unknown>[];
  actions: Record<string, unknown>[];
}

export default class FormPage extends Block {
  constructor(props: IFormPagePage) {
    super("main", props);
  }

  init() {
    document.title = this.props.title;

    // this.children.button = new Button({
    //   label: "Назад к чатам",
    //   className: "text primary",
    //   onClick() {
    //     location.replace("/");
    //   },
    // });
  }

  render() {
    return this.compile(template, this.props);
  }
}
