export type Register = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
};

export type Login = {
  email: string;
  password: string;
};
