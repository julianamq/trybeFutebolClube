import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => { 
    it('should have an email attribute', () => {
        const attributes = User.getAttributes();
        expect(attributes).to.have.property('email');
        expect(attributes.email.type.constructor.name).to.equal('STRING');
      });
    
      it('should have a password attribute', () => {
        const attributes = User.getAttributes();
        expect(attributes).to.have.property('password');
        expect(attributes.password.type.constructor.name).to.equal('STRING');
      });
    
      it('should have a role attribute', () => {
        const attributes = User.getAttributes();
        expect(attributes).to.have.property('role');
        expect(attributes.role.type.constructor.name).to.equal('STRING');
      });
    
      it.skip('should have a name attribute', () => {
        const attributes = User.getAttributes();
        expect(attributes).to.have.property('name');
        expect(attributes.name.type.constructor.name).to.equal('STRING');
      });
})