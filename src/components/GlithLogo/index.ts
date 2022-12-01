import Block from "../../utils/Block";
import template from "./glitch.hbs";
import "./index.css";

interface IGlitchProps {
  label: string;
  header: string;
  footer: string;
}

export default class Glitch extends Block {
  constructor(props: IGlitchProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
