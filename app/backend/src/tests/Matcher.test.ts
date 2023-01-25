import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Routes', () => {
  it('should return all teams on GET /teams', async () => {
    const response = await chai.request(app).get('/teams');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('id');
    expect(response.body[0]).to.have.property('teamName');
  });

  it('should return a specific team on GET /teams/:id', async () => {
    const response = await chai.request(app).get('/teams/5');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id', 5);
    expect(response.body).to.have.property('teamName', 'Cruzeiro');
  });
});
