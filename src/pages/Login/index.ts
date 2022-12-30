import Block from "../../utils/Block";

export default class LoginPage extends Block {
    constructor() {
        super({
            onLogin: () => {
                console.log("login");
            }
        })
    }

    render() {
        return `
            {{#Card title="Вход"}}
                <form>
                    {{{TextField label="Логин" name="login" validationType="login"}}}
                    {{{Button label="Авторизоваться" onClick=onLogin}}}
                    {{{Button label="Нет аккаунта?" onClick=onLogin}}}
                </form>
            {{/Card}}
        `
    }
}