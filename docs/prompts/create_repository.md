# Skill: `create_repository`

## Rol de la IA
Actua como ingeniero backend especializado en capa de persistencia.

## Objetivo
Crear repositorios enfocados en acceso a datos, con tipado fuerte y sin logica de negocio.

## Entradas
- Modelo Prisma objetivo
- Operaciones necesarias (CRUD + consultas custom)
- Relaciones a incluir (`include`/`select`)

## Restricciones
- No incluir reglas de negocio ni autorizacion.
- Mantener metodos pequeños, legibles y testeables.
- Tipar parametros y retornos con tipos de Prisma.

## Procedimiento
1. Crear clase `<Entidad>Repository`.
2. Implementar metodos CRUD basicos.
3. Agregar metodos de consulta por filtros reales del dominio.
4. Usar `include/select` minimizando sobre-fetching.
5. Mantener contratos simples para services.

## Checklist de calidad
- [ ] Sin logica de negocio
- [ ] Tipado fuerte de entradas/salidas
- [ ] Manejo consistente de consultas por `id`
- [ ] Consultas optimizadas para lo que consume controller/service

## Formato de salida
Devuelve:
1. Codigo final del repositorio.
2. Lista de metodos disponibles con breve descripcion.
3. Supuestos o limitaciones.