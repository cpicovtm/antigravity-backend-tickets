import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import prisma from '../config/prisma';

const userRepository = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Si no se envía profileId, buscamos el perfil CLIENTE y asignamos su ID
    let profileId = data.profileId;
    if (!profileId) {
      const clienteProfile = await prisma.profile.findFirst({
        where: { name: 'CLIENTE' }
      });
      if (!clienteProfile) {
        throw new Error('Default CLIENTE profile not found');
      }
      profileId = clienteProfile.id;
    }

    const newUser = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      profileId: profileId,
    });

    const { password: _password, ...safeUser } = newUser;
    void _password;
    return safeUser;
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { profile: true },
    });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        profileId: user.profileId,
        profileName: user.profile.name 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _password, profile: _profile, ...safeUser } = user;
    void _password;
    void _profile;
    return {
      user: safeUser,
      token,
    };
  }
}
