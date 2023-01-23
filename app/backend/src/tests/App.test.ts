
import * as express from 'express';
import * as sinon from 'sinon';
import { App } from '../app';


describe('App class', () => {
  let app: express.Express;

  beforeEach(() => {
    app = new App().app;
  });

  it('should initialize the express app', () => {
    expect(app).toBeInstanceOf(express.Express);
  });

  it('should call the config method', () => {
    const spy = sinon.spy(App.prototype, 'config');
    new App();
    expect(spy.calledOnce).toBe(true);
    spy.restore();
  });

  it('should start the server', () => {
    const PORT = 3000;
    const listenStub = sinon.stub();
    sinon.stub(app, 'listen').callsFake(listenStub);
    new App().start(PORT);
    expect(listenStub.calledOnce).toBe(true);
    expect(listenStub.calledWith(PORT, sinon.match.func)).toBe(true);
    app.listen.restore();
  });
});