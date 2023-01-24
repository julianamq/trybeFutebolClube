import { Request, Response } from 'express';
import LoginService from '../service/LoginService';
import LoginController from '../controller/LoginController';

describe('LoginController', () => {
  describe('Login', () => {
    it('should return 401 when LoginService.Login returns type', async () => {
      const req = { body: { some: 'data' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const message = 'Login failed';
      jest.spyOn(LoginService, 'Login').mockResolvedValue({ type: true, message });
  
      await LoginController.Login(req, res);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  
    it('should return 200 when LoginService.Login returns token', async () => {
      const req = { body: { some: 'data' } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
      const token = 'some-token';
      jest.spyOn(LoginService, 'Login').mockResolvedValue({ type: false, message: token });
  
      await LoginController.Login(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe('validate', () => {
    it('should return 200 and role from user data', async () => {
      const req = { body: { user: { data: { role: 'admin' } } } } as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
      await LoginController.validate(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ role: 'admin' });
    });
  });
});