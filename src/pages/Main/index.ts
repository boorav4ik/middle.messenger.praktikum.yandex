import Block from "../../utils/Block";
import template from "./main.hbs";
import Glitch from "../../components/GlithLogo";
import "./index.css";
import Navbar from "../../components/Navbar";

export default class MainPage extends Block {
  constructor() {
    super("div");
  }

  init() {
    this.children.navbar = new Navbar({
      logo: "Чёкак",
      pages: {
        Авторизация: "login",
        Регистрация: "sigin",
        Чаты: "chats",
        Настройки: "profile",
        404: "404",
        500: "500",
      },
    });
    this.children.content = new Glitch({
      header: "Welcome to",
      label: "ЧЁКАК",
      footer: "мессенджер",
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
