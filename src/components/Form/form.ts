import Block from "../../utils/Block";
import { IButtonConstructorProps } from "../Button";
import { TextField, ITextFieldProps } from "../TextField/textField";
import Validator from "../../utils/Validator";

export interface IFormProps {
  fields: Record<string, ITextFieldProps>;
  actions?: Record<string, IButtonConstructorProps>;
  readonly?: boolean;
  className?: string;
}

export class Form extends Block<IFormProps & { events: { submit: (event: SubmitEvent) => void } }> {
  constructor({ onSubmit, ...props }: IFormProps & { onSubmit: () => void }) {
    super({
      ...props,
      events: {
        submit: (event) => {
          event.preventDefault();
          if (this.sendFormData()) onSubmit();
        }
      }
    });
  }

  sendFormData() {
    let error = false;
    const data: Record<string, string> = {};
    Object.entries(this.refs).forEach(([key, field]: [string, Block]): void => {
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
    }
    console.log(data);
    return true;
  }

  render() {
    return `<form class={{className}}>
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
