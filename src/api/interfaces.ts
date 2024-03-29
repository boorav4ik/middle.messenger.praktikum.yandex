export interface SignInData {
  login: string;
  password: string;
}

export interface SignUpData extends SignInData {
  first_name: string;
  second_name: string;
  email: string;
  password: string;
}

export interface User extends SignUpData {
  id: number;
  phone: string;
  avatar: string;
}

export interface ChatCreateData {
  title: string;
}

export interface ChatDeleteData {
  chatId: number;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}

interface IFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: IFile;
}
