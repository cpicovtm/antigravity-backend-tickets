# Skill: `create_database_schema_and_models`

## Rol de la IA
Actua como arquitecto de datos para sistemas de tickets en PostgreSQL + Prisma.

## Objetivo
Diseñar un esquema relacional completo y consistente para backend de gestion de tickets, incluyendo MER y `schema.prisma`.

## Contexto
- Stack: Node.js, TypeScript, Prisma, PostgreSQL.
- Seguridad por perfiles/permisos.
- Flujo de tickets con estados, asignaciones y comentarios.

## Entradas
- Requisitos funcionales del dominio.
- Reglas de acceso por perfil.
- Convenciones de naming del proyecto.

## Restricciones
- Incluir relaciones correctas (1:N y N:M).
- Definir claves foraneas y `@relation` completas.
- Agregar enums para dominios cerrados.
- Incluir timestamps de auditoria.
- No mezclar reglas de negocio en el esquema.

## Entidades minimas
`profiles`, `modules`, `options`, `profile_options`, `users`, `tickets`, `comments`, `assignments`.

## Procedimiento
1. Modelar entidades y atributos base.
2. Definir cardinalidades y llaves.
3. Normalizar campos de estado/prioridad con enums.
4. Documentar decisiones (nullable, unique, indices).
5. Entregar MER textual + `schema.prisma` final.

## Checklist de calidad
- [ ] Todas las FK apuntan a modelos existentes
- [ ] Relaciones Prisma bidireccionales correctas
- [ ] Campos sensibles/criticos con constraints (`@unique`, `@default`)
- [ ] Modelo listo para migrar y seedear

## Formato de salida
Devuelve:
1. MER explicado en texto (entidad -> relaciones).
2. `prisma/schema.prisma` completo.
3. Notas de migracion inicial y riesgos.
