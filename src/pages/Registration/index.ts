import Block from "../../utils/Block";
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
        location.replace("./chats");
      }
    });
  }

  render() {
    return `{{#Card title="Регистрация"}}
      {{#Form fields=fields onSubmit=onSubmit}}
        {{{Button type="submit" label="Зарегистрироваться"}}}
      {{/Form}}
    {{/Card}}`;
  }
}
