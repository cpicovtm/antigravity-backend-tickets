import { Request, Response, NextFunction } from 'express';

type Role = 'ADMIN' | 'SOPORTE' | 'CLIENTE';
type AuthenticatedRequest = Request & {
  user?: {
    profileName?: string;
  };
};

const normalizeRole = (value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().toUpperCase();
};

export const requireRoles = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
      res.status(401).json({ status: 'error', data: { error: 'Unauthorized: User not found in token' } });
      return;
    }

    const role = normalizeRole(user.profileName);

    if (!role) {
      res.status(403).json({ status: 'error', data: { error: 'Forbidden: User role not found' } });
      return;
    }

    if (!allowedRoles.includes(role as Role)) {
      res.status(403).json({ status: 'error', data: { error: 'Forbidden: Insufficient role permissions' } });
      return;
    }

    next();
  };
};

export const requireSupportStatusOnlyUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const user = (req as AuthenticatedRequest).user;
  const role = normalizeRole(user?.profileName);

  if (role !== 'SOPORTE') {
    next();
    return;
  }

  const payloadKeys = Object.keys(req.body ?? {});

  if (payloadKeys.length === 0) {
    res.status(400).json({ status: 'error', data: { error: 'Bad Request: No fields to update' } });
    return;
  }

  const allowedKeys = new Set(['status']);
  const hasInvalidFields = payloadKeys.some((key) => !allowedKeys.has(key));

  if (hasInvalidFields) {
    res.status(403).json({
      status: 'error',
      data: { error: 'Forbidden: Support role can only update ticket status' },
    });
    return;
  }

  const allowedStatuses = new Set(['IN_PROGRESS', 'REJECTED', 'RESOLVED']);
  if (!allowedStatuses.has(req.body?.status)) {
    res.status(403).json({
      status: 'error',
      data: { error: 'Forbidden: Support can only set IN_PROGRESS, REJECTED or RESOLVED' },
    });
    return;
  }

  next();
};
