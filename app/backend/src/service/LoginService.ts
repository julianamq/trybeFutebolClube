import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import { InterfaceLogin, InterfaceValidate } from '../interfaces/Interface';
import {
  createToken,
} from '../middelwares/token';

export default class UserService {
  static async Login(data: InterfaceLogin): Promise<InterfaceValidate> {
    // console.log(JSON.stringify(data));
    const { email, password } = data;

    console.log(data, 'data controller ');
    const findUser = await User.findOne({ where: { email } });
    console.log(findUser, ' finduser controller');

    if (!findUser) {
      return { type: 'NOT_FOUND', message: 'Incorrect email or password' };
    }

    const checkPassword = bcrypt.compareSync(password as string, findUser.password);
    // bcrypt.compareSync(password, findUser.dataValues.password);
    if (!checkPassword) {
      return { type: 'NOT_FOUND', message: 'Incorrect email or password' };
    }
    const { password: _pass, ...userWithoutPassword } = findUser.dataValues;
    const token = createToken(userWithoutPassword);
    return { type: null, message: token };
  }
}
// static async validate(token: string){
// : Promise<InterfaceValidate> {
// const valido = validateToken(token);

// if (typeof valido === 'string') {
//   return { type: 'NOT_FOUND', message: 'Invalid Token' };
//   }
//   const findUser = await User.findOne({ where: { email: valido } });

//   if (!findUser) {
//     return { type: 'NOT_FOUND', message: 'user not found' };
//   }
//   return { type: null, message: findUser.dataValues.role };
// }
// }
// Cadu salvou minha vidaaa
