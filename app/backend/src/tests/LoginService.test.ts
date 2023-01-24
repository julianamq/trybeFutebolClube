import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import { InterfaceLogin, InterfaceValidate } from '../interfaces/Interface';
import { createToken } from '../middelwares/token';
import LoginService from '../service/LoginService';

describe('UserService', () => {
let sandbox: sinon.SinonSandbox;
let findOneStub: sinon.SinonStub;


beforeEach(() => {
    sandbox = sinon.createSandbox();
    findOneStub = sandbox.stub(User, 'findOne');
});

afterEach(() => {
    sandbox.restore();
});


describe('Login', () => {
    it('should return "Incorrect email or password" if user not found', async () => {
        findOneStub.returns(null);
        const data: InterfaceLogin = {email: 'test@email.com', password: 'password'};
        const result = await LoginService.Login(data);
        expect(result).to.deep.equal({type: 'NOT_FOUND', message: 'Incorrect email or password'});
    });

    it('should return "Incorrect email or password" if password is incorrect', async () => {
        findOneStub.returns({password: 'wrongpassword'});
        const data: InterfaceLogin = {email: 'test@email.com', password: 'password'};
        const result = await LoginService.Login(data);
        expect(result).to.deep.equal({type: 'NOT_FOUND', message: 'Incorrect email or password'});
    });

    it('should return a token if email and password are correct', async () => {
        findOneStub.returns({password: 'password', dataValues: {email: 'test@email.com'},});
        const data: InterfaceLogin = {email: 'test@email.com', password: 'password'};
        const createTokenStub = sandbox.stub(createToken as sinon.SinonStub).returns('token');

    
        const result = await LoginService.Login(data);
        expect(result).to.deep.equal({type: null, message: 'token'});
        expect(createTokenStub.calledWith({email: 'test@email.com'})).to.be.true;
    });
 
});
});

function codeWithOutFunctionName(findUser: { dataValues: { password: string; email: string; }; }) {
    throw new Error('Function not implemented.');
}
