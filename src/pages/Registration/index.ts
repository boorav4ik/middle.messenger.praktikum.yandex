import Block from "../../utils/Block";
import sendFormData from "../../utils/sendFormData";

const FIELD_LIST = {
  email: {
    label: "Почта",
    type: "email",
    validationType: "email",
    required: true,
    plaseholder: "Почта",
  },
  login: {
    label: "Логин",
    validationType: "login",
    required: true,
    plaseholder: "Логин",
  },
  first_name: {
    label: "Имя",
    validationType: "name",
    required: true,
    plaseholder: "Имя",
  },
  second_name: {
    label: "Фамилия",
    validationType: "name",
    required: true,
    plaseholder: "Фамилия",
  },
  phone: {
    label: "Телефон",
    type: "tel",
    validationType: "phone",
    required: true,
    plaseholder: "+7",
  },
  password: {
    label: "Пароль",
    type: "password",

    validationType: "password",
    required: true,
  },
  confirm_password: {
    label: "Пароль (ещё раз)",
    type: "password",
    validationType: "password",
    required: true,
  },
};
export default class RegistrationPage extends Block {
  constructor() {
    super({
      fields: FIELD_LIST,
      onSubmit() {
        if (sendFormData.bind(this)()) {
          location.replace("./chats");
        }
      },
    });
  }

  render() {
    return `{{#Card title="Регистрация"}}
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
                {{{Button label="Зарегистрироваться" onClick=onSubmit}}}
            </form>
        {{/Card}}`;
  }
}
