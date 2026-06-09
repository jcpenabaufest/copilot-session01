# Frontend — Aplicación Web de Login

Aplicación web construida con **React + Vite** que implementa autenticación contra el backend JWT (FastAPI). Incluye una página de login y una página de bienvenida protegida.

## Características

- **Página de Login** (`/login`): formulario de usuario y contraseña que llama al endpoint `POST /auth/token` del backend.
- **Página de Bienvenida** (`/welcome`): ruta protegida que muestra información del usuario autenticado.
- **Protección de rutas**: si no hay sesión activa, cualquier ruta redirige automáticamente a `/login`.
- **Sesión en `sessionStorage`**: el `access_token` y `refresh_token` se almacenan en `sessionStorage` (se borran al cerrar la pestaña).
- **Diseño oscuro** basado en el sistema de diseño definido en `DESIGN.md` (lienzo negro, tipografía Inter, tokens de color y espaciado).

## Requisitos

- Node.js 18+
- npm 9+
- Backend corriendo en `http://localhost:8000`

## Instalación

```bash
cd frontend
npm install
```

## Uso

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.  
El servidor de desarrollo actúa como proxy y redirige todas las solicitudes `/api/*` al backend en `http://localhost:8000`.

### Build de producción

```bash
npm run build
```

Los archivos estáticos se generan en la carpeta `dist/`.

### Preview del build

```bash
npm run preview
```

## Estructura del proyecto

```
frontend/
├── index.html              # Punto de entrada HTML
├── vite.config.js          # Configuración de Vite (proxy al backend)
├── src/
│   ├── context/
│   │   └── AuthContext.jsx  # Contexto de autenticación (token en sessionStorage)
│   ├── components/
│   │   └── ProtectedRoute.jsx  # Componente para rutas protegidas
│   ├── pages/
│   │   ├── Login.jsx        # Página de login
│   │   ├── Login.module.css # Estilos del login
│   │   ├── Welcome.jsx      # Página de bienvenida (protegida)
│   │   └── Welcome.module.css
│   ├── App.jsx              # Componente raíz con enrutamiento (React Router)
│   ├── main.jsx             # Punto de entrada de React
│   └── index.css            # Variables CSS con tokens del sistema de diseño
└── package.json
```

## Flujo de autenticación

1. El usuario ingresa su usuario y contraseña en `/login`.
2. El frontend envía `POST /api/auth/token` con las credenciales.
3. Si el backend responde con éxito, el `access_token` y `refresh_token` se guardan en `sessionStorage`.
4. El usuario es redirigido a `/welcome`.
5. Al hacer clic en "Cerrar sesión", los tokens se eliminan de `sessionStorage` y el usuario regresa a `/login`.
6. Si el usuario intenta acceder a `/welcome` sin sesión activa, es redirigido automáticamente a `/login`.

## Credenciales por defecto (backend en modo desarrollo)

| Campo    | Valor     |
|----------|-----------|
| Usuario  | `admin`   |
| Contraseña | `admin123` |

Puedes cambiar las credenciales mediante las variables de entorno del backend (`JWT_VALID_USERNAME`, `JWT_VALID_PASSWORD`).

## Sistema de diseño

La interfaz sigue el sistema de diseño documentado en `DESIGN.md` (raíz del proyecto):

- **Lienzo negro** (`#000000`) como fondo de todas las páginas.
- **Tipografía**: Inter para etiquetas de UI.
- **Botón primario**: rectángulo blanco con texto negro (el pixel más brillante del lienzo).
- **Inputs**: fondo `surface-card` (`#0a0a0c`), borde `hairline-strong` (`rgba(255,255,255,0.14)`), `border-radius: 8px`.
- **Tarjetas**: `border-radius: 12px` con borde `hairline-strong`.
- **Glows atmosféricos**: degradados radiales de baja opacidad sobre las secciones.
