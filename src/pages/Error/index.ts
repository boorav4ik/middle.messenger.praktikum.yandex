import Block from "../../utils/Block";
import template from "./error.hbs";
import Glitch from "../../components/GlithLogo";
import "./index.css";
import Button from "../../components/Button";

interface IErrorPage {
  label: string;
  header: string;
  footer: string;
  title: string;
}

export default class NotFoundPage extends Block {
  constructor(props: IErrorPage) {
    super("main", props);
  }

  init() {
    document.title = this.props.title;
    this.children.content = new Glitch({
      header: this.props.header,
      label: this.props.label,
      footer: this.props.footer,
    });
    this.children.button = new Button({
      label: "Назад к чатам",
      className: "text primary",
      onClick() {
        location.replace("/");
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
