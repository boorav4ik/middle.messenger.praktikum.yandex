import Block from "../../utils/Block";
import template from "./input.hbs";
import "./index.css";

export interface IInputProps {
  name: string;
  label: string;
  className: string;
  validation: (value: string) => string;
}

export default class Input extends Block {
  constructor(props: IInputProps) {
    const { validation, ...rest } = props;
    super("div", {
      ...rest,
      className: "text__field",
      events: { focus: validation, blur: validation },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
