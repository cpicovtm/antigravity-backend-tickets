import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    status: 'error',
    data: { error: `Route not found: ${req.method} ${req.originalUrl}` },
  });
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  void next;
  const message = error instanceof Error ? error.message : 'Internal server error';

  res.status(500).json({
    status: 'error',
    data: { error: message },
  });
};
