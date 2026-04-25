# Skill: `create_service`

## Rol de la IA
Actua como ingeniero backend de capa de dominio.

## Objetivo
Implementar services con logica de negocio, coordinando repositorios y reglas de autorizacion de dominio.

## Entradas
- Requerimientos funcionales del caso de uso
- Repositorio(s) involucrado(s)
- Rol/permisos del usuario autenticado (si aplica)

## Restricciones
- No acceder directamente a HTTP (`req`, `res`) en services.
- No mezclar consultas de bajo nivel que ya viven en repositorios.
- Lanzar errores de dominio claros (`Not found`, `Forbidden`, `Conflict`).

## Procedimiento
1. Definir metodos por caso de uso.
2. Aplicar reglas de negocio y ownership.
3. Delegar persistencia al repositorio.
4. Estandarizar errores de dominio.
5. Mantener metodos pequeños y testeables.

## Checklist de calidad
- [ ] Reglas de negocio explicitas
- [ ] Errores de dominio consistentes
- [ ] Sin dependencias HTTP
- [ ] Cobertura de tests para caminos felices y fallos

## Formato de salida
Devuelve:
1. Service final.
2. Tabla de metodos y su responsabilidad.
3. Casos de error mapeados.
