import Block from "../../utils/Block";
import template from "./form.hbs";
import Textarea from "../Textarea";
import "./index.css";

interface IFormProps {
  fields: Record<string, string>[];
  actions: Record<string, string>[];
}

export default class Form extends Block {
  constructor(props: IFormProps) {
    super("form", props);
  }

  init() {
    this.children.textarea = new Textarea({ text: "hskjalkjaljdfsjfskdfl" });
  }

  render() {
    return this.compile(template, this.props);
  }
}
