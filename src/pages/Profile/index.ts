import Block from "../../utils/Block";
import styles from "./index.pcss";

const PROFILE_FIELD_LIST = {
    email: {
        type: "email",
        label: "Почта",
        value: "pochta@yandex.ru",
        validation: "email",
    },
    login: {
        type: "text",
        label: "Логин",
        value: "admin",
        validation: "login",
    },
    first_name: {
        type: "text",
        label: "Имя",
        value: "Иван",
        validation: "name",
    },
    second_name: {
        type: "text",
        label: "Фамилия",
        value: "Иванов",
        validation: "name",
    },
    display_name: {
        type: "text",
        label: "Имя в чате",
        value: "Игорь Николаев",
        validation: "name",
    },
    phone: {
        type: "phone",
        label: "Телефон",
        value: "+7 (800) 100 50 00",
        validation: "phone",
    }
}

const PASSWORD_FIELD_LIST = {
    oldPassword: {
        label: "Старый пароль"
    },
    newPassword: {
        label: "Новый пароль"
    },
    newPasswordConfirm: { label: "Повторите новый пароль" }
}

export default class ProfilePage extends Block {
    constructor() {
        super({
            profileFields: PROFILE_FIELD_LIST,
            passwordFields: PASSWORD_FIELD_LIST,
            actions: {
                "editData": {
                    "label": "Изменить данные",
                    "onClick": () => {
                        console.log("onClick", this)
                        this.setProps({ isReadonly: !this.props.isReadonly })
                    },
                    "color": "primary"
                },
                "editPassword": {
                    "label": "Изменить пароль",
                    "color": "primary"
                },
                "exit": {
                    "label": "Выйти",
                    "color": "error"
                }
            },
            isReadonly: true,

        }
        )
    }
    render() {
        return `<div class="${styles.chat_page_conteiner}">
            <aside class="${styles.aside}">
                {{#Link
                    to="/chats"
                    className="${styles.back_button}"
                }}
                    ➜
                {{/Link}}
            </aside>
            <main>
                <sections id="avatar">
                    avatar
                </sections>
                <section id="profile">
                    <ul>
                        {{#each profileFields}}
                            <li>
                                {{{TextField
                                    label=this.label
                                    name=@key
                                    validationType=this.validation
                                    readonly=../isReadonly
                                    type=this.type
                                }}}
                            </li>
                        {{/each}}
                    </ul>
                </section>
                <section id="password">
                    <ul>
                        {{#each passwordFields}}
                            <li>
                                {{{TextField
                                    label=this.label
                                    type="password"
                                    name=@key
                                    validationType="password"
                                }}}
                            </li>
                        {{/each}}
                    </ul>
                </section>
                <section id="saveButton">
                    {{{Button label="Сохранить"}}}
                </sections>
                <section id="actions">
                    {{#each actions}}
                        {{log this}}
                        {{{Button
                            label=this.label
                            onClick=this.onClick
                        }}}
                    {{/each}}
                </sections>
            </main>
        </div>`
    }
}