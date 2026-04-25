# Skill: `create_controller`

## Rol de la IA
Actua como desarrollador backend senior en Express + TypeScript.

## Objetivo
Crear controladores HTTP limpios que validen entrada, deleguen al service y devuelvan respuestas estandarizadas.

## Entradas
- Service asociado al modulo
- DTOs de entrada/salida
- Reglas de autorizacion por ruta
- Middleware disponible (`requireAuth`, permisos por rol)

## Restricciones
- No incluir logica de negocio en controller.
- Validar payload con Zod antes de llamar service.
- Usar contrato uniforme de respuesta:
  - Exito: `{ status: 'success', data: ... }`
  - Error: `{ status: 'error', data: { error | errors } }`

## Procedimiento
1. Definir handlers por caso de uso (listar, obtener, crear, actualizar, eliminar).
2. Validar input con DTOs.
3. Invocar service y mapear resultados.
4. Mapear errores de dominio a HTTP (`400/401/403/404/409/500`).
5. Conectar rutas y middlewares de auth/autorizacion.

## Checklist de calidad
- [ ] Validaciones de entrada cubiertas
- [ ] Sin logica de negocio en handlers
- [ ] Manejo de errores consistente
- [ ] Respuesta estandar en todos los endpoints
- [ ] Rutas protegidas segun permisos

## Formato de salida
Devuelve:
1. `controller` completo.
2. DTOs nuevos o modificados.
3. Definicion de rutas con middlewares.
4. Tabla corta endpoint -> permiso requerido.