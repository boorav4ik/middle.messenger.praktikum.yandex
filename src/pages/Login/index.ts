import Block from "../../utils/Block";
import fields from "../../mock/loginFieldList";
import { IButtonConstructorProps } from "../../components/Button";
import AuthController from "../../controllers/AuthController";
import { SingInData } from "../../api/interfaces";

interface ILoginPageProps {
  fields: Record<string, unknown>;
  onLogin: (data: SingInData) => void;
  actions: IButtonConstructorProps[];
}
export default class LoginPage extends Block<ILoginPageProps> {
  constructor() {
    document.title = "Chokak - Login";
    super({
      fields,
      actions: [
        {
          label: "Авторизоваться",
          type: "submit"
        }
      ],
      onLogin(data: SingInData) {
        // location.replace("/messenger");
        console.log("!!!", data);
        AuthController.signin(data as SingInData).then(console.log);
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
