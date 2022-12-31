import Block from "../../utils/Block";

export default class LoginPage extends Block {
    constructor() {
        super({
            onLogin: () => {
                location.replace("/chats")
            }
        })
    }

    render() {
        return `
            {{#Card title="Вход"}}
                <form>
                    {{{TextField
                        label="Логин"
                        name="login"
                        validationType="login"
                        required=true
                    }}}
                    {{{TextField
                        label="Пароль"
                        name="password"
                        type="password"
                        validationType="password"
                        required=true
                    }}}
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
        `
    }
}