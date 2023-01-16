import Block from "../../utils/Block";
import fields from "../../mock/registrationFieldList";
import AuthController from "../../controllers/AuthController";

interface IRegistrationPageProps {
  fields: Record<string, unknown>;
  onSubmit: (data: Record<string, string>) => void;
}
export default class RegistrationPage extends Block<IRegistrationPageProps> {
  constructor() {
    document.title = "Chokak - SingUp";
    super({
      fields,
      onSubmit(data: Record<string, string>) {
        AuthController.signup(data);
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
