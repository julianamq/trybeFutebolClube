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
interface IToken {
  id: number;
  email: string;
  username: string;
  role: string;
  passwor: string;
}
export { InterfaceLogin, InterfaceValidate, InterfaceToken, IToken };
