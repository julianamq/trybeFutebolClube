import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../../src/database/models/TeamModels'
import { Response } from 'superagent';
import { Teams } from '../tests/mocks/mockTeams'

chai.use(chaiHttp);

const { expect } = chai;describe('Testando buscas de times', () => {
    it('É possível buscar todos os times com sucesso', async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(Teams as Team[]);

      const { body, status } = await chai.request(app).get('/teams');
      
      expect(body).to.be.equal(Team);
      expect(status).to.equal(200);
    });
});

describe.skip("Testando Teams.", () => {

  it.skip("Testa se recebe status 400", async () =>{
    const resp = await chai.request(app).post('/teams');

    expect(resp.status).to.equal(404);
  });

  it.skip("Testa se retorna uma mensagem de erro específica.", async () => {
    const resp = await chai.request(app).post('/teams');

    expect(resp.body).to.deep.equals('No teams found');
  });
});
