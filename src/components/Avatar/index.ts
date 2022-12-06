import Block from "../../utils/Block";
import defaultImg from "../../static/png/default_image.png";
import template from "./index.hbs";
import "./index.css";

interface IAvatarProps {
  src?: string;
  size?: string;
  label?: string;
}

export default class Avatar extends Block {
  constructor({ src, size = "large", ...rest }: IAvatarProps) {
    super("div", {
      ...rest,
      className: "avatar_wrapper circle".concat(` ${size}` ?? ""),
      src: src || defaultImg,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
