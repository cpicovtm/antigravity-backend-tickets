import { Request, Response } from 'express';
import { ModuleService } from '../services/module.service';
import { z } from 'zod';
import { createModuleSchema, updateModuleSchema } from '../dtos/module.dto';
import { getErrorMessage } from '../utils/error.util';

const moduleService = new ModuleService();

export const getModules = async (req: Request, res: Response) => {
  try {
    const modules = await moduleService.getAllModules();
    res.status(200).json({ status: 'success', data: modules });
  } catch (error: unknown) {
    res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
  }
};

export const getModuleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const moduleItem = await moduleService.getModuleById(id);
    res.status(200).json({ status: 'success', data: moduleItem });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Module not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const createModule = async (req: Request, res: Response) => {
  try {
    const validatedData = createModuleSchema.parse(req.body);
    const newModule = await moduleService.createModule(validatedData);
    res.status(201).json({ status: 'success', data: newModule });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const updateModule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateModuleSchema.parse(req.body);
    const updatedModule = await moduleService.updateModule(id, validatedData);
    res.status(200).json({ status: 'success', data: updatedModule });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'Module not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const deleteModule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await moduleService.deleteModule(id);
    res.status(200).json({ status: 'success', data: null });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Module not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};
