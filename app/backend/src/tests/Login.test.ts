// import * as chai from 'chai';
// // import * as dotenv from 'dotenv';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';

// chai.use(chaiHttp);

// const { expect } = chai;
import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import {
  user,
  invalidEmail,
  invalidPassword,
  validUser,
  noEmail,
  noPassword,
} from './mocks/mocks';
import User from '../database/models/UserModel';
import { IToken } from '../interfaces/Interface'
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;
const VALID_TOKEN = 'VALID_TOKEN';

describe("Seção 1-1 Testando a rota POST /login", () => {
  describe("1- Testar sem receber email e senha", () => {
    it("1-1 Retorna um status 400", async () => {
      const result = await chai.request(app).post('/login');
      expect(result.status).to.equal(400);
    });

    it("1-2 Retorna uma menssagem de erro", async () => {
      const result = await chai.request(app).post('/login');
      expect(result.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });

  describe("2- Testar com um email inválido", () => {
    beforeEach(async () => sinon.stub(User, 'findOne').resolves(null));
    afterEach(() => sinon.restore());

    it("2-1- Retorna um status 401", async () => {
      const result = await chai.request(app).post('/login').send(invalidEmail);
      expect(result.status).to.be.equal(401);
    });

    it("2-2 Retorna uma menssagem de erro", async () => {
      const result = await chai.request(app).post('/login').send(invalidEmail);
      expect(result.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe("3- Testar com um password inválido", () => {
    beforeEach(() => { 
      sinon.stub(Model, 'findOne').resolves();
      sinon.stub(bcrypt, 'compareSync').resolves(false);
    });
    afterEach(() => sinon.restore());

    it("3-1 Retorna uma menssagem de erro", async () => {
      const result = await chai.request(app).post('/login').send(invalidPassword);
      expect(result.body).to.deep.equal({ message: 'Incorrect email or password' });
    });
  });

  describe("4- Testar com login feito com sucesso", () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves();
      sinon.stub(bcrypt, 'compareSync').resolves(true);
      sinon.stub(jwt, 'sign').resolves(VALID_TOKEN);
    });
    afterEach(() => sinon.restore());

    it("4-1 Retorna um status 200", async () => {
      const result = await chai.request(app).post('/login').send(validUser);
      expect(result.status).to.equal(200);
    });

    it("4-2 Retorna um token", async () => {
      const result = await chai.request(app).post("/login").send(validUser);
      expect(result.body).to.have.property('token');
    });
  });

  describe("5- Testar aplicação com erro falta de dados", () => {
    beforeEach(() => sinon.stub(Model, 'findOne').rejects());
    afterEach(() => sinon.restore());

    it("5-1- Retorna um status 400 ao não digitar password", async () => {
      const result = await chai.request(app).post('/login').send(noEmail);
      expect(result.status).to.equal(400);
    });

    it("5-2 Retorna uma menssagem de erro", async () => {
      const result = await chai.request(app).post('/login').send(noEmail);
      expect(result.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it("5-3- Retorna um status 400 ao não digitar password", async () => {
      const result = await chai.request(app).post('/login').send(noPassword);
      expect(result.status).to.equal(400);
    });

    it("5-4 Retorna uma menssagem de erro", async () => {
      const result = await chai.request(app).post('/login').send(noPassword);
      expect(result.body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });
});

describe("Seção 1-2 Testando a rota GET /login/validate", () => {
  describe("6- Quando funciona corretamente", () => {
    beforeEach(() => {
      sinon.stub(User, 'findByPk').resolves({ id: 1 } as IToken | any);
    });
    afterEach(() => sinon.restore());

    it("6-1 Retorna um status 401", async () => {
      const result = await chai.request(app).get('/login/validate').set('Authorization', VALID_TOKEN);
      expect(result.status).to.equal(401);
    });

    it("6-2 Retorna um role do usuário logado e uma mensagem", async () => {
      const result = await chai.request(app).get('/login/validate').set('Authorization', VALID_TOKEN);
      expect(result.body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});

// describe('Login Route', () => {
//   it('should return a token on valid login', async () => {
//     const response = await chai
//       .request(app)
//       .post('/login')
//       .send({ email: 'user@user.com', password: 'secret_user' });

//     expect(response).to.have.status(200);
//     expect(response.body).to.have.property('token');
//   });

//   it('should return an error on invalid login', async () => {
//     const response = await chai
//       .request(app)
//       .post('/login')
//       .send({ email: 'test@example.com', password: 'wrong_password' });

//     expect(response).to.have.status(401);
//     expect(response.body).to.have.property('message');
//   });
// });
