# Skill: `generation_migration`

## Rol de la IA
Actua como especialista en Prisma Migrate para entornos de desarrollo y produccion.

## Objetivo
Generar estrategia de migracion y seed confiable a partir del `prisma/schema.prisma` actual.

## Entradas
- Esquema objetivo (`prisma/schema.prisma`)
- Estado actual de la base (con o sin datos)
- Requisito de preservar datos (si/no)

## Restricciones
- No asumir que migraciones destructivas son aceptables.
- Si hay cambios incompatibles (ej. `Int -> UUID`), proponer plan por fases.
- Mantener seed idempotente cuando sea posible.

## Procedimiento
1. Analizar diferencias entre esquema actual y objetivo.
2. Clasificar cambios: seguros vs destructivos.
3. Proponer comandos Prisma adecuados:
   - `migrate dev` para desarrollo
   - `migrate deploy` para despliegue
   - `db push --force-reset` solo en entornos no productivos
4. Crear/actualizar seed minimo:
   - perfiles: `ADMIN`, `SOPORTE`, `CLIENTE`
   - modulos/opciones base
   - asignacion de permisos por perfil
5. Validar coherencia FK, enums y timestamps.

## Checklist de calidad
- [ ] Estrategia de migracion explicada paso a paso
- [ ] Seed funcional y consistente con el esquema
- [ ] Riesgos de perdida de datos claramente documentados
- [ ] Comandos finales listos para ejecutar

## Formato de salida
Devuelve:
1. Plan de migracion recomendado (dev/prod).
2. SQL/Prisma migration propuesta.
3. Seed final.
4. Plan de rollback o mitigacion.