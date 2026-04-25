import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';
import { z } from 'zod';
import { createProfileSchema, updateProfileSchema } from '../dtos/profile.dto';
import { getErrorMessage } from '../utils/error.util';

const profileService = new ProfileService();

export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.status(200).json({ status: 'success', data: profiles });
  } catch (error: unknown) {
    res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await profileService.getProfileById(id);
    res.status(200).json({ status: 'success', data: profile });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Profile not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const validatedData = createProfileSchema.parse(req.body);
    const newProfile = await profileService.createProfile(validatedData);
    res.status(201).json({ status: 'success', data: newProfile });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateProfileSchema.parse(req.body);
    const updatedProfile = await profileService.updateProfile(id, validatedData);
    res.status(200).json({ status: 'success', data: updatedProfile });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ status: 'error', data: { errors: error.errors } });
    } else if (getErrorMessage(error) === 'Profile not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await profileService.deleteProfile(id);
    res.status(200).json({ status: 'success', data: null });
  } catch (error: unknown) {
    if (getErrorMessage(error) === 'Profile not found') {
      res.status(404).json({ status: 'error', data: { error: getErrorMessage(error) } });
    } else {
      res.status(500).json({ status: 'error', data: { error: getErrorMessage(error) } });
    }
  }
};
