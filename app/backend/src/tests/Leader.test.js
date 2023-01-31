import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import TeamService from '../service/TeamService';
// import TeamController from './TeamController';

chai.use(chaiHttp);

describe('TeamController', () => {
  let getByIdStub;

  beforeEach(() => {
    getByIdStub = sinon.stub(TeamService, 'getById');
  });

  afterEach(() => {
    getByIdStub.restore();
  });

  describe('getById', () => {
    it('should return 200 and message if type is falsy', async () => {
      getByIdStub.resolves({ type: false, message: 'Team found' });
      const res = await chai.request(app).get('/teams/1');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message', 'Team found');
    });

    it('should return 400 and message if type is truthy', async () => {
      getByIdStub.resolves({ type: true, message: 'Team not found' });
      const res = await chai.request(app).get('/teams/1');

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message', 'Team not found');
    });
  });
});

  describe('GET /teams', () => {
    it('should return a list of teams', async () => {
      const res = await chai.request(app).get('/teams');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0]).to.have.property('id', 1);
      expect(res.body[0]).to.have.property('name', 'Team 1');
    });
  });

  describe('GET /teams/:id', () => {
    it('should return a team by id', async () => {
      const res = await chai.request(app).get('/teams/1');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('name', 'Team 1');
    });

    it('should return an error if team is not found', async () => {
      getByIdStub.resolves({ type: 'ERROR', message: 'Team not found' });
      const res = await chai.request(app).get('/teams/2');

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message', 'Team not found');
    });
  });

  describe('GET /functionGetTeams', () => {
    it('should return a list of teams', async () => {
      const res = await chai.request(app).get('/functionGetTeams');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0]).to.have.property('id', 1);
      expect(res.body[0]).to.have.property('name', 'Team 1');
    });
    describe('getById', () => {
      it('should return 200 and message if type is falsy', async () => {
        getByIdStub.resolves({ type: false, message: 'Team found' });
        const res = await chai.request(app).get('/teams/1');
  
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Team found');
      });
  
      it('should return 400 and message if type is truthy', async () => {
        getByIdStub.resolves({ type: true, message: 'Team not found' });
        const res = await chai.request(app).get('/teams/1');
  
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Team not found');
      });
  });
});



