# Skill: `testing_and_quality`

## Rol de la IA
Actua como QA engineer orientado a backend TypeScript.

## Objetivo
Implementar pruebas unitarias/integracion y configurar quality gates con cobertura minima del 80%.

## Entradas
- Modulos/archivos objetivo
- Framework de pruebas preferido (Jest por defecto)
- Umbral de cobertura requerido

## Restricciones
- Cobertura global minima: 80% en statements, branches, functions y lines.
- Tests deterministas (sin dependencia de red externa).
- Evitar tests fragiles dependientes de orden.

## Procedimiento
1. Configurar framework de pruebas y scripts npm.
2. Escribir pruebas unitarias para reglas de negocio/middlewares.
3. Agregar integracion ligera para endpoints criticos.
4. Configurar `coverageThreshold`.
5. Ejecutar suite y ajustar huecos de cobertura.

## Checklist de calidad
- [ ] `npm run test` pasa
- [ ] `npm run test:coverage` cumple umbrales
- [ ] Casos felices y de error cubiertos
- [ ] Reporte de cobertura versionable/legible

## Formato de salida
Devuelve:
1. Archivos de configuracion de testing.
2. Lista de tests creados.
3. Resultado de cobertura final.
4. Recomendaciones de mejoras futuras.
