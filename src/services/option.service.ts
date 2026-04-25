import { OptionRepository } from '../repositories/option.repository';
import { Prisma } from '@prisma/client';

const repository = new OptionRepository();

export class OptionService {
  async getAllOptions() {
    return repository.findAll();
  }

  async getOptionById(id: string) {
    const option = await repository.findById(id);
    if (!option) {
      throw new Error('Option not found');
    }
    return option;
  }

  async createOption(data: Prisma.OptionUncheckedCreateInput) {
    return repository.create(data);
  }

  async updateOption(id: string, data: Prisma.OptionUncheckedUpdateInput) {
    await this.getOptionById(id);
    return repository.update(id, data);
  }

  async deleteOption(id: string) {
    await this.getOptionById(id);
    return repository.delete(id);
  }
}
