import { registerComponent } from "./utils/registerComponent";
import * as components from "./components";
import LoginPage from "./pages/Login";



window.addEventListener("DOMContentLoaded", async () => {
    Object.values(components).forEach((component) =>
        registerComponent(component)
    )

    const root = document.querySelector("#root");

    if (!root) return;
    const homePage = new LoginPage();
    const content = homePage.getContent()

    if (content instanceof Node) {
        root.innerHTML = '';
        root.appendChild(content)
    }
})