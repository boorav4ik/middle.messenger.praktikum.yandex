import { Block } from "../utils/Block";
import { Card } from "./Card";
import { Input } from "./Input";
import { Error } from "./Error";
import { TextField } from "./TextField";
import { Link } from "./Link";
import { ChatList } from "./ChatList";
import { ChatListItem } from "./ChatListItem";
import { MessageList } from "./MessageList";
import { MessageListItem } from "./MessageListItem";
import { AttachInput } from "./AttachInput";
import { ImageButton } from "./ImageButton";
import { Form } from "./Form";
import { Messenger } from "./Messenger";
import { ListWithScroll } from "./ListWithScroll";
import { registerComponent } from "../utils/registerComponent";
import { Button } from "./Button";

export function registerComponents() {
  registerComponent("Button", Button as typeof Block);
  registerComponent("Card", Card as typeof Block);
  registerComponent("Input", Input as typeof Block);
  registerComponent("Error", Error as typeof Block);
  registerComponent("TextField", TextField as typeof Block);
  registerComponent("Link", Link as typeof Block);
  registerComponent("ChatListItem", ChatListItem as typeof Block);
  registerComponent("MessageListItem", MessageListItem as typeof Block);
  registerComponent("AttachInput", AttachInput as typeof Block);
  registerComponent("ImageButton", ImageButton as typeof Block);
  registerComponent("Form", Form as typeof Block);
  registerComponent("Messenger", Messenger as typeof Block);
  registerComponent("ChatList", ChatList as typeof Block);
  registerComponent("MessageList", MessageList as typeof Block);
  registerComponent("ListWithScroll", ListWithScroll as typeof Block);
}
