import Block from "../../utils/Block";
import template from "./textarea.hbs";
import "./index.css";

interface ITextareaProps {
  text: string;
  content: string;
}

export default class Textarea extends Block {
  constructor(props: ITextareaProps) {
    super("textarea", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
