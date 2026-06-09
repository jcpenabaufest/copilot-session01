# copilot-session01

Proyecto full-stack con un backend de autenticación JWT (FastAPI) y un frontend web (React + Vite).

## Estructura del repositorio

```
.
├── backend/      # API REST con FastAPI + JWT
├── frontend/     # Aplicación web React (login + bienvenida)
└── Design.md     # Sistema de diseño (tokens de color, tipografía, componentes)
```

## Backend

API REST desarrollada con **Python + FastAPI** que expone endpoints de autenticación con JWT.

### Inicio rápido

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

La API queda disponible en `http://localhost:8000`.  
Documentación interactiva: `http://localhost:8000/docs`

Ver [backend/README.md](backend/README.md) para más detalles.

## Frontend

Aplicación web con página de login y página de bienvenida protegida, construida con **React + Vite**.

### Inicio rápido

> Asegúrate de que el backend esté corriendo antes de iniciar el frontend.

```bash
cd frontend
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Ver [frontend/README.md](frontend/README.md) para más detalles.

## Credenciales por defecto

| Campo      | Valor     |
|------------|-----------|
| Usuario    | `admin`   |
| Contraseña | `admin123` |

## Sistema de diseño

Las convenciones visuales (colores, tipografía, espaciado, componentes) están documentadas en [Design.md](Design.md).
