# Backend Tickets - Antigravity

Backend API para gestion de tickets con Node.js, Express, TypeScript, Prisma y PostgreSQL.

## Requisitos

- Node.js 20+
- PostgreSQL
- npm

## Configuracion

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno en `.env`:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT` (opcional)

3. Aplicar esquema en desarrollo:

```bash
npx prisma db push
```

4. Ejecutar seed:

```bash
npx prisma db seed
```

## Ejecucion

Modo desarrollo:

```bash
npm run dev
```

Build de produccion:

```bash
npm run build
npm start
```

## Calidad y Testing

Lint:

```bash
npm run lint
```

Tests:

```bash
npm test
```

Coverage (minimo requerido 80%):

```bash
npm run test:coverage
```

## Documentacion adicional

- Contrato API para mocks: `docs/api-mocks-contract.md`
- Gobernanza de prompts/skills: `docs/prompts/`
