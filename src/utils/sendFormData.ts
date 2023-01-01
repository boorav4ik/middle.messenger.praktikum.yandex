import Validator from "./Validator";
import Block from "./Block";
import { TextField } from "../components";

export default function (this: Block) {
  let error: boolean = false;
  const data: Record<string, string> = {};

  Object.entries(this.refs).forEach(([key, field]): void => {
    const refs = field instanceof TextField ? field.getRefs() : null;
    if (!refs) return;
    const { value } = refs.input.getContent() as HTMLInputElement;
    data[key] = value;
    const { validationType } = this.props.fields[key];
    if (validationType) {
      const [isValid, text] = Validator.validate(validationType, value);
      refs.error.setProps({ isValid, text });
      if (!isValid) error = true;
    }
  });
  if (error) {
    return false;
  } else {
    console.log(data);
    return true;
  }
}
