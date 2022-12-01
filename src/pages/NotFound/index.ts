import Block from "../../utils/Block";
import template from "./notFound.hbs";
import Glitch from "../../components/GlithLogo";
import "./index.css";

export default class NotFoundPage extends Block {
  constructor() {
    super("main");
  }

  init() {
    this.children.content = new Glitch({
      header: "Not Found",
      label: "404",
      footer: "Error",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
