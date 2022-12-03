import Block from "../../utils/Block";
import NavLink from "../NavLink";
import template from "./navbar.hbs";
import "./index.css";

interface INavbarProps {
  logo: string;
  pages: Record<string, string>;
}

export default class Navbar extends Block {
  constructor(props: INavbarProps) {
    super("nav", props);
  }

  init() {
    this.children.logo = new NavLink({ label: this.props.logo, to: "/" });
    Object.entries(this.props.pages).forEach(
      ([label, to]) =>
        (this.children[label] = new NavLink({ label, to: String(to) }))
    );
  }
  render() {
    return this.compile(template, this.props);
  }
}
