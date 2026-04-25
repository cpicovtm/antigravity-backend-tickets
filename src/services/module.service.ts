import { ModuleRepository } from '../repositories/module.repository';
import { Prisma } from '@prisma/client';

const repository = new ModuleRepository();

export class ModuleService {
  async getAllModules() {
    return repository.findAll();
  }

  async getModuleById(id: string) {
    const moduleItem = await repository.findById(id);
    if (!moduleItem) {
      throw new Error('Module not found');
    }
    return moduleItem;
  }

  async createModule(data: Prisma.ModuleCreateInput) {
    return repository.create(data);
  }

  async updateModule(id: string, data: Prisma.ModuleUpdateInput) {
    await this.getModuleById(id);
    return repository.update(id, data);
  }

  async deleteModule(id: string) {
    await this.getModuleById(id);
    return repository.delete(id);
  }
}
