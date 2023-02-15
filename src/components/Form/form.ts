import { Block } from "../../utils/Block";
import { IButtonConstructorProps } from "../Button";
import { TextField, ITextFieldProps } from "../TextField/textField";
import { validtor } from "../../utils/Validator";
import template from "./form.hbs";

export interface IFormProps {
  fields: Record<string, ITextFieldProps>;
  values?: Record<string, string>;
  actions?: Record<string, IButtonConstructorProps>;
  readonly?: boolean;
  className?: string;
}

export class Form extends Block<IFormProps & { events: { submit: (event: SubmitEvent) => void } }> {
  constructor({
    fields,
    values,
    onSubmit,
    ...props
  }: IFormProps & { onSubmit: (data: Record<string, string>) => void }) {
    const fieldsWithValue = values
      ? Object.keys(fields).reduce(
          (acc, key) => ({
            ...acc,
            [key]: { ...fields[key], value: values[key] ?? fields[key].value }
          }),
          {}
        )
      : fields;
    super({
      ...props,
      fields: fieldsWithValue,
      events: {
        submit: (event) => {
          event.preventDefault();
          const data = this.verifyFormData();
          if (data) onSubmit(data);
        }
      }
    });
  }

  verifyFormData() {
    let error = false;
    const data: Record<string, string> = {};
    Object.entries(this.refs).forEach(([key, field]: [string, Block]): void => {
      const refs = field instanceof TextField ? field.getRefs() : null;
      if (!refs) return;
      const { value } = refs.input.getContent() as HTMLInputElement;
      data[key] = value;
      const { validationType } = this.props.fields[key];
      if (validationType) {
        const [isValid, text] = validtor.validate(validationType, value);
        refs.error.setProps({ isValid, text });
        if (!isValid) error = true;
      }
    });
    if (error) {
      return false;
    }
    return data;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
