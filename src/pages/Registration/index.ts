import Block from "../../utils/Block";
import sendFormData from "../../utils/sendFormData";
import fields from "../../mock/registrationFieldList";

interface IRegistrationPageProps {
  fields: Record<string, unknown>;
  onSubmit: () => void;
}
export default class RegistrationPage extends Block<IRegistrationPageProps> {
  constructor() {
    super({
      fields,
      onSubmit() {
        if (sendFormData.bind(this)()) {
          location.replace("./chats");
        }
      }
    });
  }

  render() {
    return `{{#Card title="Регистрация"}}
            <form submit=onSubmit>
            {{#each fields}}
              {{{TextField
                label=label
                name=@key
                type=type
                validationType=validationType
                required=required
                ref=@key
              }}}
            {{/each}}
                {{{Button type=submit label="Зарегистрироваться"}}}
            </form>
        {{/Card}}`;
  }
}
