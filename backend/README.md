# Backend JWT API (FastAPI)

Esta carpeta contiene una API desarrollada con **Python + FastAPI** que implementa autenticación con **JWT**.

## Requisitos

- Python 3.11+
- [Poetry](https://python-poetry.org/)
- Docker y Docker Compose (opcional)

## Instalación y ejecución local

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

La API quedará disponible en `http://localhost:8000`.

## Endpoints

### 1) Generar token

- **POST** `/auth/token`
- Body JSON:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta (ejemplo):

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

El `access_token` expira en **300 segundos**.

### 2) Refrescar token

- **POST** `/auth/refresh`
- Body JSON:

```json
{
  "refresh_token": "<jwt_refresh>"
}
```

Respuesta (ejemplo):

```json
{
  "access_token": "<nuevo_jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

## Variables de entorno

- `JWT_SECRET_KEY` (default: `development-secret-key`)
- `JWT_VALID_USERNAME` (default: `admin`)
- `JWT_VALID_PASSWORD` (default: `admin123`)

## Ejecutar con Docker

Desde la carpeta `backend`:

```bash
docker compose up --build
```

La API quedará disponible en `http://localhost:8000`.

## Documentación interactiva

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
