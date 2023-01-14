export interface SingInData {
  login: string;
  password: string;
}

export interface SignUpData extends SingInData {
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
