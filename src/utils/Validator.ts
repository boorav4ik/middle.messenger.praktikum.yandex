export enum ValidationType {
  Email = "email",
  Name = "name",
  Login = "login",
  Password = "password",
  Phone = "phone"
}

type ValidatorMethod = (value: string) => [boolean, string];
class Validator {
  email: ValidatorMethod = (value) => [
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z](?:[a-z-]*[a-z])?\.)+[a-z](?:[a-z-]*[a-z])?$/i.test(
      value
    ),
    "Некорректный адрес почты"
  ];

  name: ValidatorMethod = (value) => [
    /[A-ZА-Я][a-zа-я\-]*/.test(value),
    "Допустимы символы латиницы и кириллицы, а также дефис"
  ];

  login: ValidatorMethod = (value) => [
    /[A-Za-z0-9_\-]{3,20}/.test(value) && !/^\d+$/.test(value),
    "Логин должен состояить из латинских букв и цифр, также допустимы символы _ и -"
  ];

  password: ValidatorMethod = (value) => [
    /[A-Za-z0-9]{8,40}/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value),
    "Пароль должен содержать одну заглавную букву и одну цифру"
  ];

  phone: ValidatorMethod = (value) => [
    /\+?[0-9]{10,15}/.test(value),
    "Некорректный номер телефона"
  ];

  validate(type: ValidationType, value: string): [boolean, string] {
    switch (type) {
      case ValidationType.Email:
        return this.email(value);
      case ValidationType.Login:
        return this.login(value);
      case ValidationType.Name:
        return this.name(value);
      case ValidationType.Password:
        return this.password(value);
      case ValidationType.Phone:
        return this.phone(value);
      default:
        return [!!value.length, "Значение не должно быть пустым"];
    }
  }
}

export default new Validator();
