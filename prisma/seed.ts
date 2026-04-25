import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Limpiar la base de datos (opcional, útil para desarrollo)
  await prisma.profileOption.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.option.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.profile.deleteMany({});

  console.log('Base de datos limpiada. Insertando datos...');

  // 2. Crear Profiles
  const profileAdmin = await prisma.profile.create({
    data: { name: 'ADMIN', description: 'Administrador del sistema con acceso total' },
  });
  const profileSoporte = await prisma.profile.create({
    data: { name: 'SOPORTE', description: 'Agente de soporte técnico' },
  });
  const profileCliente = await prisma.profile.create({
    data: { name: 'CLIENTE', description: 'Usuario final que reporta incidencias' },
  });

  console.log('Profiles creados.');

  // 3. Crear Modules
  const moduleTickets = await prisma.module.create({
    data: { name: 'Tickets', description: 'Gestión de incidencias', active: true },
  });
  const moduleUsers = await prisma.module.create({
    data: { name: 'Usuarios', description: 'Gestión de usuarios y perfiles', active: true },
  });
  const moduleConfig = await prisma.module.create({
    data: { name: 'Configuracion', description: 'Configuraciones del sistema', active: true },
  });

  console.log('Modules creados.');

  // 4. Crear Options (vinculadas a los módulos)
  // Módulo Tickets
  const optionListarTickets = await prisma.option.create({
    data: { name: 'Listar y Crear Tickets', moduleId: moduleTickets.id, path: '/tickets', icon: 'ticket' },
  });
  const optionComentarTickets = await prisma.option.create({
    data: { name: 'Comentar Tickets', moduleId: moduleTickets.id, path: '/tickets/comments', icon: 'comment' },
  });
  const optionAsignarTickets = await prisma.option.create({
    data: { name: 'Asignar Tickets', moduleId: moduleTickets.id, path: '/tickets/assign', icon: 'user-plus' },
  });

  // Módulo Usuarios
  const optionGestionarUsuarios = await prisma.option.create({
    data: { name: 'Gestionar Usuarios', moduleId: moduleUsers.id, path: '/users', icon: 'users' },
  });

  // Módulo Configuración
  const optionOpcionesSistema = await prisma.option.create({
    data: { name: 'Opciones del Sistema', moduleId: moduleConfig.id, path: '/settings', icon: 'settings' },
  });

  console.log('Options creadas.');

  // 5. Asignar Accesos (Profile_Options)
  // ADMIN: Acceso Total
  const allOptions = [
    optionListarTickets, optionComentarTickets, optionAsignarTickets,
    optionGestionarUsuarios, optionOpcionesSistema
  ];
  for (const option of allOptions) {
    await prisma.profileOption.create({
      data: { profileId: profileAdmin.id, optionId: option.id },
    });
  }

  // SOPORTE: Acceso a tickets, comentarios y asignaciones
  const soporteOptions = [optionListarTickets, optionComentarTickets, optionAsignarTickets];
  for (const option of soporteOptions) {
    await prisma.profileOption.create({
      data: { profileId: profileSoporte.id, optionId: option.id },
    });
  }

  // CLIENTE: Solo creación y consulta de tickets
  await prisma.profileOption.create({
    data: { profileId: profileCliente.id, optionId: optionListarTickets.id },
  });

  console.log('Permisos Profile_Options asignados.');

  // 6. Crear Usuario Administrador por defecto
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      profileId: profileAdmin.id,
    },
  });

  console.log(`Usuario administrador creado: ${adminUser.email}`);
  console.log('Seeding terminado exitosamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
