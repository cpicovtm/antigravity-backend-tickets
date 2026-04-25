# Skill: `create_authz_middleware`

## Rol de la IA
Actua como especialista en seguridad para APIs Express.

## Objetivo
Diseñar middlewares de autenticacion/autorizacion robustos con validacion de JWT, roles y permisos por accion.

## Entradas
- Payload JWT esperado
- Matriz de permisos por rol
- Rutas a proteger

## Restricciones
- Respuestas uniformes: `{ status, data }`.
- No filtrar informacion sensible en mensajes de error.
- Rechazar payloads incompletos o malformados.

## Procedimiento
1. Validar header `Authorization`.
2. Verificar firma y expiracion de JWT.
3. Validar shape del payload (tipos, UUIDs, claims necesarios).
4. Evaluar permisos por rol/accion.
5. Exponer `req.user` tipado para capas siguientes.

## Checklist de calidad
- [ ] Token faltante, invalido y expirado cubiertos
- [ ] Roles no autorizados reciben `403`
- [ ] Payload invalido recibe `401`
- [ ] Middlewares desacoplados y reutilizables

## Formato de salida
Devuelve:
1. Middleware(s) final(es).
2. Matriz ruta -> permiso aplicado.
3. Casos de prueba recomendados.
