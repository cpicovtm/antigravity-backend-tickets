import {
  requireRoles,
  requireSupportStatusOnlyUpdate,
} from '../../../src/middlewares/permission.middleware';

const createRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return res as any;
};

describe('permission middleware', () => {
  describe('requireRoles', () => {
    it('debe responder 401 si no hay usuario en request', () => {
      const req = {} as any;
      const res = createRes();
      const next = jest.fn();

      requireRoles(['ADMIN'])(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it('debe responder 403 si no tiene rol permitido', () => {
      const req = { user: { profileName: 'CLIENTE' } } as any;
      const res = createRes();
      const next = jest.fn();

      requireRoles(['ADMIN'])(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('debe permitir acceso cuando rol es válido', () => {
      const req = { user: { profileName: 'admin' } } as any;
      const res = createRes();
      const next = jest.fn();

      requireRoles(['ADMIN'])(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('requireSupportStatusOnlyUpdate', () => {
    it('debe permitir cualquier payload para ADMIN', () => {
      const req = { user: { profileName: 'ADMIN' }, body: { status: 'OPEN', title: 'x' } } as any;
      const res = createRes();
      const next = jest.fn();

      requireSupportStatusOnlyUpdate(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('debe rechazar update vacío para SOPORTE', () => {
      const req = { user: { profileName: 'SOPORTE' }, body: {} } as any;
      const res = createRes();
      const next = jest.fn();

      requireSupportStatusOnlyUpdate(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    it('debe rechazar campos distintos a status para SOPORTE', () => {
      const req = { user: { profileName: 'SOPORTE' }, body: { title: 'nuevo' } } as any;
      const res = createRes();
      const next = jest.fn();

      requireSupportStatusOnlyUpdate(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });

    it('debe permitir solo status para SOPORTE', () => {
      const req = { user: { profileName: 'SOPORTE' }, body: { status: 'RESOLVED' } } as any;
      const res = createRes();
      const next = jest.fn();

      requireSupportStatusOnlyUpdate(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
