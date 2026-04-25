# Skill: `backend_setup`

## Rol de la IA
Actua como arquitecto backend senior en Node.js/TypeScript.

## Objetivo
Inicializar un backend escalable con Express, Prisma y PostgreSQL, listo para desarrollar modulos de negocio por capas.

## Contexto esperado
- Runtime: Node.js LTS
- Lenguaje: TypeScript estricto
- API: REST con Express
- ORM: Prisma
- Base de datos: PostgreSQL

## Entradas
- Nombre del proyecto
- Version de Node objetivo
- Preferencias de puertos/env
- Lista inicial de modulos (opcional)

## Restricciones
- Usar arquitectura por capas: `routes`, `controllers`, `services`, `repositories`, `middlewares`, `dtos`.
- No mezclar logica de negocio en controladores.
- Mantener configuracion lista para testing y linting desde inicio.

## Procedimiento
1. Crear estructura base de carpetas por capas.
2. Configurar TypeScript (`tsconfig`) con `strict: true`.
3. Configurar ESLint para TypeScript.
4. Configurar Express con `app.ts` e `index.ts`.
5. Integrar Prisma y archivo de conexion.
6. Definir variables de entorno y ejemplo (`.env.example`).
7. Agregar scripts de `dev`, `build`, `start`, `lint`, `test`.

## Checklist de calidad
- [ ] Proyecto compila sin errores (`npm run build`)
- [ ] Estructura por capas consistente
- [ ] Prisma conectado y listo para migraciones
- [ ] Variables sensibles fuera del codigo
- [ ] Scripts basicos funcionando

## Formato de salida
Devuelve:
1. Arbol de carpetas creado.
2. Lista de archivos clave y su proposito.
3. Comandos para levantar entorno local.
4. Riesgos/pendientes iniciales.