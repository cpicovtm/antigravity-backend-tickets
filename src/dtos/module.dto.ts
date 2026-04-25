import { z } from 'zod';

export const createModuleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  active: z.boolean().optional(),
});

export const updateModuleSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
});

export type CreateModuleDto = z.infer<typeof createModuleSchema>;
export type UpdateModuleDto = z.infer<typeof updateModuleSchema>;
