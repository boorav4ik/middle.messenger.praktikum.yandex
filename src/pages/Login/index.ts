import { Block } from "../../utils/Block";
import { IButtonConstructorProps } from "../../components/Button";
import { controller } from "../../controllers/AuthController";
import { SignInData } from "../../api/interfaces";
import { loginFieldList } from "../../mock/loginFieldList";

interface ILoginPageProps {
  fields: Record<string, unknown>;
  onLogin: (data: SignInData) => void;
  actions: IButtonConstructorProps[];
}
export class LoginPage extends Block<ILoginPageProps> {
  constructor() {
    document.title = "Chokak - Login";
    super({
      fields: loginFieldList,
      actions: [
        {
          label: "Авторизоваться",
          type: "submit"
        }
      ],
      onLogin(data: SignInData) {
        controller.signin(data as SignInData);
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
