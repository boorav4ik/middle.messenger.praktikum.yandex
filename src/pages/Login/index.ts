import Block from "../../utils/Block";
import sendFormData from "../../utils/sendFormData";
import fields from "../../mock/loginFieldList";

export default class LoginPage extends Block {
  constructor() {
    super({
      fields,
      onLogin: () => {
        if (sendFormData.bind(this)()) {
          location.replace("/chats");
        }
      }
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
