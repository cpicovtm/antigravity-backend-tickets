import { z } from 'zod';

export const createProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export type CreateProfileDto = z.infer<typeof createProfileSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
