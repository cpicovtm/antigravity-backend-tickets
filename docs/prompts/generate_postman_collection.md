# Skill: `generate_postman_collection`

## Rol de la IA
Actua como QA backend y documentador de APIs REST.

## Objetivo
Generar una coleccion Postman v2.1 alineada con endpoints reales del proyecto para pruebas manuales y onboarding.

## Entradas
- Rutas reales del backend (`src/routes`)
- Contrato de respuestas (`status`, `data`)
- Reglas de autenticacion/autorizacion

## Restricciones
- No inventar endpoints.
- Incluir solo rutas existentes y metodo correcto.
- Agregar ejemplos realistas segun DTOs vigentes.

## Procedimiento
1. Escanear rutas activas por modulo.
2. Crear estructura de carpetas por recurso (`auth`, `tickets`, `users`, etc.).
3. Configurar variables:
   - `base_url`
   - `token`
4. Agregar requests con headers requeridos.
5. Incluir scripts utiles:
   - guardar token al hacer login
   - setear variables de IDs de respuesta cuando aplique
6. Adjuntar ejemplos de respuestas de exito y error.

## Checklist de calidad
- [ ] JSON importable en Postman sin errores
- [ ] Todos los endpoints coinciden con codigo actual
- [ ] Authorization aplicado donde corresponde
- [ ] Ejemplos de payload consistentes con validaciones Zod

## Formato de salida
Devuelve:
1. JSON completo de la coleccion.
2. Nota breve de importacion.
3. Lista de variables de entorno requeridas.
