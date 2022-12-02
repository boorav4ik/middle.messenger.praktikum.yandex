import Block from "../../utils/Block";
import template from "./login.hbs";
import "./index.css";
import Form from "../../components/Form";
import Textarea from "../../components/Textarea";

export default class LoginPage extends Block {
  constructor() {
    super("main");
  }

  init() {
    document.title = "Login";
    this.children.form = new Form({ fields: [], actions: [] });
    this.children.textarea = new Textarea({ text: "sadasdads" });
  }

  render() {
    return this.compile(template, this.props);
  }
}
