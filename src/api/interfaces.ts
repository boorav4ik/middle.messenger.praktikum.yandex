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
  avatat: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}
