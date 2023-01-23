
import * as sinon from 'sinon';
import * as express from 'express';
import { App } from '../app';
import { expect } from 'chai';

describe('App class', () => {
  let app: express.Express;

  beforeEach(() => {
    app = new App().app;
  });

  it('should initialize the express app', () => {
    expect(app).to.be.a('function');
  });

  it('should call the config method', () => {
    const spy = sinon.spy(App.prototype,'start');
    new App();
    expect(spy.calledOnce).to.be.true;
    spy.restore();
  });

  it('should start the server', () => {
    const PORT = 3100;
    // const listenStub = sinon.stub();
    const listenSpy =  sinon.spy(app.prototype, 'listen');
    app.listen(PORT)
    // new App().start(PORT);
    // expect(listenStub.calledOnce).to.be.true;
     expect(listenSpy.calledWith(PORT)).to.be.true;
    // app.listen.

  });
});