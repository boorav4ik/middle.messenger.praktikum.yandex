import Block from "../../utils/Block";
import fields from "../../mock/loginFieldList";
import { IButtonConstructorProps } from "../../components/Button";

interface ILoginPageProps {
  fields: Record<string, unknown>;
  onLogin: () => void;
  actions: IButtonConstructorProps[];
}
export default class LoginPage extends Block<ILoginPageProps> {
  constructor() {
    super({
      fields,
      actions: [
        {
          label: "Авторизоваться",
          type: "submit"
        }
      ],
      onLogin() {
        location.replace("/messenger");
      }
    });
  }

  render() {
    return `{{#Card title="Вход"}}
      {{#Form fields=fields actions=actions onSubmit=onLogin}}
        {{#Link
            to="/sign-up"
        }}
            Нет аккаунта?
        {{/Link}}
      {{/Form}}
    {{/Card}}`;
  }
}
