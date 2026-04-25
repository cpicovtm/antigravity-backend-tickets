import { Request, Response } from 'express';
import { OptionService } from '../services/option.service';
import { z } from 'zod';
import { createOptionSchema, updateOptionSchema } from '../dtos/option.dto';
import { getErrorMessage } from '../utils/error.util';

const optionService = new OptionService();

export const getOptions = async (req: Request, res: Response) => {
  try {
    const options = await optionService.getAllOptions();
    res.status(200).json({ status: 'success', data: options });
  } catch (error: unknown) {
    res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
  }
};

export const getOptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const option = await optionService.getOptionById(id);
    res.status(200).json({ status: 'success', data: option });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Option not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const createOption = async (req: Request, res: Response) => {
  try {
    const validatedData = createOptionSchema.parse(req.body);
    const newOption = await optionService.createOption(validatedData);
    res.status(201).json({ status: 'success', data: newOption });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const updateOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateOptionSchema.parse(req.body);
    const updatedOption = await optionService.updateOption(id, validatedData);
    res.status(200).json({ status: 'success', data: updatedOption });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'Option not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const deleteOption = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await optionService.deleteOption(id);
    res.status(200).json({ status: 'success', data: null });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Option not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};
