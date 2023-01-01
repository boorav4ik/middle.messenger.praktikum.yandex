import Block from "../../utils/Block";
import sendFormData from "../../utils/sendFormData";

const FIELD_LIST = {
  login: {
    label: "Логин",
    validationType: "login",
    required: true,
  },
  password: {
    label: "Пароль",
    type: "password",
    validationType: "password",
    required: true,
  },
};

export default class LoginPage extends Block {
  constructor() {
    super({
      fields: FIELD_LIST,
      onLogin: () => {
        if (sendFormData.bind(this)()) {
          location.replace("/chats");
        }
      },
    });
  }

  render() {
    return `
            {{#Card title="Вход"}}
                <form>
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
                  {{{Button
                      label="Авторизоваться"
                      onClick=onLogin
                  }}}
                  {{#Link
                      to="/registration"
                  }}
                      Нет аккаунта?
                  {{/Link}}
                </form>
            {{/Card}}
        `;
  }
}
