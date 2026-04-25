import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type AuthTokenPayload = {
  userId: string;
  email: string;
  profileId: string;
  profileName: string;
};
type AuthenticatedRequest = Request & { user?: AuthTokenPayload };

const isValidPayload = (payload: unknown): payload is AuthTokenPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const tokenData = payload as Partial<AuthTokenPayload>;
  return (
    typeof tokenData.userId === 'string' &&
    UUID_REGEX.test(tokenData.userId) &&
    typeof tokenData.profileId === 'string' &&
    UUID_REGEX.test(tokenData.profileId) &&
    typeof tokenData.email === 'string' &&
    typeof tokenData.profileName === 'string'
  );
};

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ status: 'error', data: { error: 'Unauthorized: No token provided' } });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!isValidPayload(decoded)) {
      res.status(401).json({
        status: 'error',
        data: { error: 'Unauthorized: Invalid token payload. Please login again.' },
      });
      return;
    }

    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch {
    res.status(401).json({ status: 'error', data: { error: 'Unauthorized: Invalid token' } });
  }
};
