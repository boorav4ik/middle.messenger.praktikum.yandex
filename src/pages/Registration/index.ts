import { Block } from "../../utils/Block";
import { controller } from "../../controllers/AuthController";
import { SignUpData } from "../../api/interfaces";
import { registrationFieldList } from "../../mock/registrationFieldList";
import template from "./index.hbs";

interface IRegistrationPageProps {
  fields: Record<string, unknown>;
  onSubmit: (data: SignUpData) => void;
}
export class RegistrationPage extends Block<IRegistrationPageProps> {
  constructor() {
    document.title = "Chokak - SingUp";
    super({
      fields: registrationFieldList,
      onSubmit(data: SignUpData) {
        controller.signup(data);
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
