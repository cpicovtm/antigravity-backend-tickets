import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../dtos/auth.dto';
import { z } from 'zod';
import { getErrorMessage } from '../utils/error.util';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await authService.register(validatedData);
    res.status(201).json({ status: 'success', data: user });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'Email already in use') {
      res.status(409).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData);
    res.status(200).json({ status: 'success', data: result });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'Invalid credentials') {
      res.status(401).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};
