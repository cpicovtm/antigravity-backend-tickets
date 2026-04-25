import { ProfileRepository } from '../repositories/profile.repository';
import { Prisma } from '@prisma/client';

const repository = new ProfileRepository();

export class ProfileService {
  async getAllProfiles() {
    return repository.findAll();
  }

  async getProfileById(id: string) {
    const profile = await repository.findById(id);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }

  async createProfile(data: Prisma.ProfileCreateInput) {
    return repository.create(data);
  }

  async updateProfile(id: string, data: Prisma.ProfileUpdateInput) {
    // Verificar si existe antes de actualizar
    await this.getProfileById(id);
    return repository.update(id, data);
  }

  async deleteProfile(id: string) {
    await this.getProfileById(id);
    return repository.delete(id);
  }
}
