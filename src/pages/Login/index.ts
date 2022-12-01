import Block from "../../utils/Block";
import template from "./login.hbs";
import "./index.css";

export default class LoginPage extends Block {
  constructor() {
    super("main");
  }

  init() {
    document.title = "Login";
  }

  render() {
    return this.compile(template, this.props);
  }
}
