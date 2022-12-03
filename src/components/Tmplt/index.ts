import Block from "../../utils/Block";
import template from "./index.hbs";
import "./index.css";

interface INavLinkProps {
  label: string;
  to: string;
}

export default class NavLink extends Block {
  constructor(props: INavLinkProps) {
    super("li", props);
  }

  render() {
    return this, this.compile(template, this.props);
  }
}
