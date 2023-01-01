import { registerComponent } from './utils/registerComponent';
import * as components from './components';
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import Block from './utils/Block';
import ChatsPage from './pages/Chats';
import ProfilePage from './pages/Profile';

function route(path: string): typeof Block {
  switch (path) {
    case '/':
    case '/login':
      return LoginPage;
    case '/registration':
      return RegistrationPage;
    case '/chats':
      return ChatsPage;
    case '/profile':
      return ProfilePage;
    default:
      return LoginPage;
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  Object.values(components).forEach((component) => registerComponent(component));

  const root = document.querySelector('#root');

  if (!root) return;
  const path = window.location.pathname!;
  const PageClass = route(path);
  const page = new PageClass();
  const content = page.getContent();

  if (content instanceof Node) {
    root.innerHTML = '';
    root.appendChild(content);
  }
});
