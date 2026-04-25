import jwt from 'jsonwebtoken';
import { requireAuth } from '../../../src/middlewares/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const createRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return res as any;
};

describe('requireAuth middleware', () => {
  it('debe responder 401 si no hay token', () => {
    const req = { headers: {} } as any;
    const res = createRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe responder 401 con token de firma inválida', () => {
    const invalidToken = jwt.sign({ userId: 'abc' }, 'otro_secreto');
    const req = { headers: { authorization: `Bearer ${invalidToken}` } } as any;
    const res = createRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      data: { error: 'Unauthorized: Invalid token' },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('debe responder 401 si payload no tiene UUIDs válidos', () => {
    const token = jwt.sign(
      {
        userId: '2',
        profileId: '1',
        email: 'a@b.com',
        profileName: 'CLIENTE',
      },
      JWT_SECRET,
    );

    const req = { headers: { authorization: `Bearer ${token}` } } as any;
    const res = createRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('debe continuar con next si token y payload son válidos', () => {
    const token = jwt.sign(
      {
        userId: '11111111-1111-4111-8111-111111111111',
        profileId: '22222222-2222-4222-8222-222222222222',
        email: 'admin@test.com',
        profileName: 'ADMIN',
      },
      JWT_SECRET,
    );

    const req = { headers: { authorization: `Bearer ${token}` } } as any;
    const res = createRes();
    const next = jest.fn();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.user).toBeDefined();
  });
});
