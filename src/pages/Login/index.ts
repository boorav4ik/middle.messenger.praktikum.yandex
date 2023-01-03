import Block from "../../utils/Block";
import fields from "../../mock/loginFieldList";
import { IButtonConstructorProps } from "../../components/Button";

interface ILoginPageProps {
  fields: Record<string, unknown>;
  onLogin: () => void;
}
export default class LoginPage extends Block<
  ILoginPageProps & { actions: IButtonConstructorProps[] }
> {
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
        location.replace("/chats");
      }
    });
  }

  render() {
    return `{{#Card title="Вход"}}
      {{#Form fields=fields actions=actions onSubmit=onLogin}}
        {{#Link
            to="/registration"
        }}
            Нет аккаунта?
        {{/Link}}
      {{/Form}}
    {{/Card}}`;
  }
}
