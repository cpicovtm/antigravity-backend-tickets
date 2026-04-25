import { z } from 'zod';

export const createOptionSchema = z.object({
  moduleId: z.string().uuid('Module ID is required'),
  name: z.string().min(1, 'Name is required'),
  path: z.string().optional(),
  icon: z.string().optional(),
});

export const updateOptionSchema = z.object({
  moduleId: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  path: z.string().optional(),
  icon: z.string().optional(),
});

export type CreateOptionDto = z.infer<typeof createOptionSchema>;
export type UpdateOptionDto = z.infer<typeof updateOptionSchema>;
