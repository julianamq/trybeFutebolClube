import * as sinon from 'sinon';
import * as chai from 'chai';
import * as  mocha from 'mocha'
import chaiHttp from 'chai-http';
import LoginService from '../service/LoginService'
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe.skip('LoginController', () => {
  describe('Matches', () => {
    it('should return an array of matches', async () => {
      const req: Request = {} as Request;
      const res: Response = {
        status: (status: number): Response => {
          expect(status).to.equal(200);
          return res;
        },
        json: (matches: any): void => {
          expect(matches).to.be.an('array');
        }
      } as Response;
      await LoginController.Matches(req, res);
    });

    it('should return a 404 status and message if no matches are found', async () => {
      const req: Request = {} as Request;
      const res: Response = {
        status: (status: number): Response => {
          expect(status).to.equal(404);
          return res;
        },
        json: (matches: any): void => {
          expect(matches).to.deep.equal({message: 'No matches found'});
        }
      } as Response;
      await LoginController.Matches(req, res);
    });
  });
});