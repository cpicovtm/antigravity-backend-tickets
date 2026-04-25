# Skill: `create_entity_model`

## Rol de la IA
Actua como modelador de datos backend con experiencia en Prisma.

## Objetivo
Crear o actualizar una entidad de dominio en `prisma/schema.prisma` respetando convenciones del proyecto.

## Entradas
- Nombre de la entidad
- Campos (tipo, nullable, default)
- Relaciones (1:1, 1:N, N:M)
- Reglas de negocio relevantes para constraints

## Restricciones
- Usar Prisma como fuente de verdad.
- Incluir `createdAt` y `updatedAt` cuando aplique.
- Mantener consistencia de naming (`camelCase` en modelo, `snake_case` con `@map` si aplica).
- Evitar duplicar relaciones ya existentes.

## Procedimiento
1. Revisar modelos relacionados para evitar conflictos.
2. Definir campos obligatorios/opcionales.
3. Agregar relaciones y claves foraneas.
4. Agregar enums cuando haya dominio cerrado de valores.
5. Validar sintaxis Prisma y coherencia del modelo.

## Checklist de calidad
- [ ] Tipos correctos y consistentes
- [ ] Relaciones bidireccionales completas
- [ ] Campos de auditoria definidos
- [ ] Indices/unique agregados cuando corresponde
- [ ] Modelo listo para migrar sin ambiguedad

## Formato de salida
Devuelve:
1. Bloque final del modelo Prisma.
2. Explicacion corta de decisiones de modelado.
3. Impacto esperado en migraciones.