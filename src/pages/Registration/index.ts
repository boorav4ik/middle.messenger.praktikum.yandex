import Block from "../../utils/Block"

export default class RegistrationPage extends Block{
    constructor() {
        super({
            onSubmit() {
                location.replace("./chats");
            }
        })
    }
    render() {
        return `{{#Card title="Регистрация"}}
            <form>
                {{{TextField
                    label="Почта"
                    type="email"
                    name="email"
                    validationType="email"
                    required=true
                    plaseholder="Почта"
                }}}
                {{{TextField
                    label="Логин"
                    type="text"
                    name="login"
                    validationType="login"
                    required=true
                    plaseholder="Логин"
                }}}
                {{{TextField
                    label="Имя"
                    type="text"
                    name="first_name"
                    validationType="name"
                    required=true
                    plaseholder="Имя"
                }}}
                {{{TextField
                    label="Фамилия"
                    type="text"
                    name="second_name"
                    validationType="name"
                    required=true
                    plaseholder="Фамилия"
                }}}
                {{{TextField
                    label="Телефон"
                    type="tel"
                    name="phone"
                    validationType="phone"
                    required=true
                    plaseholder="+7"
                }}}
                {{{TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    validationType="password"
                    required=true
                }}}
                {{{TextField
                    label="Пароль (ещё раз)"
                    type="password"
                    name="confirm_password"
                    validationType="password"
                    required=true
                }}}
                {{{Button label="Зарегистрироваться" onClick=onSubmit}}}
            </form>
        {{/Card}}`
    }
}