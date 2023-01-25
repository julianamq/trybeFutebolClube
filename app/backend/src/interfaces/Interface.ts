interface InterfaceLogin {
  email?: string;
  password?: string;
  username?: string;
}

interface InterfaceValidate {
  type: string | null,
  message: string,
}

interface InterfaceToken {
  id?: number,
  username: string,
  vocation: string,
  level: number,
}

export { InterfaceLogin, InterfaceValidate, InterfaceToken };
