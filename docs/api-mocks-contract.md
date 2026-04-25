# Contrato API (Mocks Frontend)

Este documento define ejemplos de Request/Response para que Frontend pueda crear mocks sin depender del backend desplegado.

## Convención de respuesta

- Éxito: `{ "status": "success", "data": ... }`
- Error: `{ "status": "error", "data": { "error": "mensaje" } }`
- Validación: `{ "status": "error", "data": { "errors": [...] } }`

## Auth

### `POST /api/auth/login`

Request:

```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

Response 200:

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "11111111-1111-4111-8111-111111111111",
      "name": "Super Admin",
      "email": "admin@test.com",
      "profileId": "22222222-2222-4222-8222-222222222222",
      "createdAt": "2026-04-25T21:00:00.000Z",
      "updatedAt": "2026-04-25T21:00:00.000Z"
    },
    "token": "jwt.token.here"
  }
}
```

Response 401:

```json
{
  "status": "error",
  "data": {
    "error": "Invalid credentials"
  }
}
```

## Tickets

> Requiere header `Authorization: Bearer <token>`.

### `GET /api/tickets`

Response 200:

```json
{
  "status": "success",
  "data": [
    {
      "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      "title": "No puedo iniciar sesión",
      "description": "El sistema rechaza mi contraseña",
      "status": "OPEN",
      "priority": "HIGH",
      "userId": "33333333-3333-4333-8333-333333333333",
      "assignedTo": null
    }
  ]
}
```

### `POST /api/tickets`

Request (cliente):

```json
{
  "title": "Error en formulario",
  "description": "No guarda los cambios",
  "priority": "MEDIUM"
}
```

Response 201:

```json
{
  "status": "success",
  "data": {
    "id": "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    "title": "Error en formulario",
    "description": "No guarda los cambios",
    "status": "OPEN",
    "priority": "MEDIUM",
    "userId": "33333333-3333-4333-8333-333333333333",
    "assignedTo": null
  }
}
```

### `PUT /api/tickets/:id`

Request (soporte, solo estado):

```json
{
  "status": "IN_PROGRESS"
}
```

Response 200:

```json
{
  "status": "success",
  "data": {
    "id": "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    "status": "IN_PROGRESS"
  }
}
```

Response 403 (soporte intenta cambiar otro campo):

```json
{
  "status": "error",
  "data": {
    "error": "Forbidden: Support role can only update ticket status"
  }
}
```

### `GET /api/tickets/:id`

Response 403 (cliente accede ticket ajeno):

```json
{
  "status": "error",
  "data": {
    "error": "Forbidden"
  }
}
```

Response 404:

```json
{
  "status": "error",
  "data": {
    "error": "Ticket not found"
  }
}
```

## Usuarios

### `GET /api/users`

Response 200:

```json
{
  "status": "success",
  "data": [
    {
      "id": "55555555-5555-4555-8555-555555555555",
      "name": "Usuario Demo",
      "email": "user@test.com",
      "profileId": "66666666-6666-4666-8666-666666666666"
    }
  ]
}
```

## Health

### `GET /api/health`

Response 200:

```json
{
  "status": "success",
  "data": {
    "message": "Backend is running"
  }
}
```
