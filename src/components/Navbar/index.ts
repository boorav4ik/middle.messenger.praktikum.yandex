import Block from "../../utils/Block";
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

  render() {
    return this.compile(template, this.props);
  }
}
