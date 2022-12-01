import Block from "../../utils/Block";
import template from "./serverError.hbs";
import Glitch from "../../components/GlithLogo";
import "./index.css";

export default class ServerErrorPage extends Block {
  constructor() {
    super("main");
  }

  init() {
    this.children.content = new Glitch({
      header: "Internal Server",
      label: "500",
      footer: "Error",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
