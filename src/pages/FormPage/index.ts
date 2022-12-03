import Block from "../../utils/Block";
import template from "./formpage.hbs";
import Form from "../../components/Form";
import "./index.css";

interface IFormPagePage {
  name: string;
  title: string;
  inputs: Record<string, unknown>[];
  actions: Record<string, unknown>[];
}

export default class FormPage extends Block {
  constructor(props: IFormPagePage) {
    super("main", props);
  }

  init() {
    document.title = this.props.title;
    this.children.form = new Form(this.props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
