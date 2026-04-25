import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { z } from 'zod';
import { createUserSchema, updateUserSchema } from '../dtos/user.dto';
import { getErrorMessage } from '../utils/error.util';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    // Exclude passwords from response
    const safeUsers = users.map((user) => {
      const { password: _password, ...rest } = user;
      void _password;
      return rest;
    });
    res.status(200).json({ status: 'success', data: safeUsers });
  } catch (error: unknown) {
    res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    const { password: _password, ...safeUser } = user;
    void _password;
    res.status(200).json({ status: 'success', data: safeUser });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'User not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const newUser = await userService.createUser(validatedData);
    const { password: _password, ...safeUser } = newUser;
    void _password;
    res.status(201).json({ status: 'success', data: safeUser });
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateUserSchema.parse(req.body);
    const updatedUser = await userService.updateUser(id, validatedData);
    const { password: _password, ...safeUser } = updatedUser;
    void _password;
    res.status(200).json({ status: 'success', data: safeUser });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'User not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({ status: 'success', data: null });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'User not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};
