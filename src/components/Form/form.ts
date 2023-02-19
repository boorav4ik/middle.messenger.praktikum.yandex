import { Block } from "../../utils/Block";
import { IButtonConstructorProps } from "../Button";
import { TextField, ITextFieldProps } from "../TextField/textField";
import { validator } from "../../utils/Validator";

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
  }: IFormProps & { onSubmit: (data: Record<string, string> | SubmitEvent) => void }) {
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
          else onSubmit(event);
        }
      }
    });
  }

  verifyFormData() {
    if (!Object.keys(this.refs).length) return null;

    let error = false;
    const data: Record<string, string> = {};
    Object.entries(this.refs).forEach(([key, field]: [string, Block]): void => {
      const refs = field instanceof TextField ? field.getRefs() : null;
      if (!refs) return;
      const { required, value } = refs.input.getContent() as HTMLInputElement;
      if (!value && !required) return;

      data[key] = value;
      const { validationType } = this.props.fields[key];
      if (validationType) {
        const [isValid, text] = validator.validate(validationType, value);
        refs.error.setProps({ isValid, text });
        if (!isValid) error = true;
      }
    });

    if (error) {
      return null;
    }
    return data;
  }

  render() {
    return `<form{{#className}} class="{{this}}"{{/className}}>
      {{#each fields}}
        {{{TextField
          label=label
          name=@key
          type=type
          validationType=validationType
          required=required
          ref=@key
          readonly=../readonly
          placeholder=value
        }}}
      {{/each}}
      {{#each actions}}
        {{{Button
          label=label
          type=type
          onClick=onClick
        }}}
      {{/each}}
    </form>`;
  }
}
