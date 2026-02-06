import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import userIdValidator from '../../src/validators/requests/userIdValidator';
import { userProfileDataValidator } from '../../src/validators/requests/userProfileDataValidator';
import { userTypeValidator } from '../../src/validators/requests/userTypeValidator';

describe('Route Validator Integration Tests', () => {
  describe('userIdValidator middleware', () => {
    it('should pass valid userId through middleware', () => {
      const app = express();
      app.get(
        '/test/:userId',
        userIdValidator,
        (req: Request, res: Response) => {
          res.status(200).json({ success: true });
        }
      );

      return request(app)
        .get('/test/valid-user-123')
        .expect(200)
        .expect({ success: true });
    });
  });

  describe('userProfileDataValidator middleware', () => {
    it('should pass valid profile data', () => {
      const app = express();
      app.use(express.json());
      app.post(
        '/test',
        userProfileDataValidator,
        (req: Request, res: Response) => {
          res.status(200).json({ success: true });
        }
      );

      return request(app)
        .post('/test')
        .send({
          displayName: 'John Doe',
          phoneNumber: '+1234567890',
          gender: 'Man',
          dateOfBirth: '1990-01-15',
          bio: 'Test'
        })
        .expect(200);
    });

    it('should reject invalid data', () => {
      const app = express();
      app.use(express.json());
      app.post(
        '/test',
        userProfileDataValidator,
        (req: Request, res: Response) => {
          res.status(200).json({ success: true });
        }
      );

      return request(app)
        .post('/test')
        .send({
          displayName: '', // Invalid
          phoneNumber: 'invalid',
          gender: 'InvalidGender',
          dateOfBirth: '1990-01-15',
          bio: 'Test'
        })
        .expect(400);
    });
  });

  describe('userTypeValidator middleware', () => {
    it('should pass valid user type', () => {
      const app = express();
      app.use(express.json());
      app.post('/test', userTypeValidator, (req: Request, res: Response) => {
        res.status(200).json({ success: true });
      });

      return request(app)
        .post('/test')
        .send({ userType: 'Adopter' })
        .expect(200);
    });

    it('should reject invalid user type', () => {
      const app = express();
      app.use(express.json());
      app.post('/test', userTypeValidator, (req: Request, res: Response) => {
        res.status(200).json({ success: true });
      });

      return request(app)
        .post('/test')
        .send({ userType: 'InvalidType' })
        .expect(400);
    });
  });
});
