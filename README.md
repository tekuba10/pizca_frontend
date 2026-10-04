# Pizca Frontend

Frontend web de **Pizca**, construido como proyecto independiente y consumidor de Pizca API.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Docker
- Docker Compose

## Requisitos

- Docker
- Docker Compose
- Pizca API disponible para las funcionalidades que requieran backend

## Desarrollo

Levantar el frontend:

~~bash
docker compose up -d --build
~~

Ver estado:

~~bash
docker compose ps
~~

Ver logs:

~~bash
docker compose logs -f frontend
~~

Detener:

~~bash
docker compose down
~~

El frontend queda disponible por defecto en:

~~text
http://localhost:5173
~~

## Hot Reload

El código fuente está montado dentro del contenedor mediante un volumen.

Los cambios realizados en `src/` se reflejan automáticamente durante el desarrollo sin reconstruir la imagen.

## Variables de entorno

Crear `.env` tomando como referencia `.env.example`.

Variables actuales:

~~ini
VITE_API_URL=http://localhost:8083/api/v1
VITE_CLIENT_ID=pizca-web-test
~~

Las variables que comienzan por `VITE_` son accesibles desde el navegador.

Nunca almacenar secretos, contraseñas, API keys privadas o credenciales sensibles en variables `VITE_*`.

## Comunicación con Pizca API

El frontend consume Pizca API mediante el cliente centralizado:

~~text
src/services/api.ts
~~

Flujo:

~~text
React
  ↓
Service
  ↓
ApiClient
  ↓
HTTP
  ↓
Pizca API
~~

El ApiClient centraliza:

- URL de la API
- `X-Client-Id`
- `Authorization: Bearer`
- Responses
- Errores de API

## Estructura

~~text
src/
├── components/
│   ├── layout/
│   └── ui/
├── hooks/
├── pages/
├── router/
├── services/
├── styles/
├── types/
├── App.tsx
└── main.tsx
~~

### components

Componentes reutilizables de interfaz y layout.

### pages

Pantallas principales de la aplicación.

### services

Comunicación con Pizca API y servicios externos.

### hooks

Lógica reutilizable de React.

### types

Tipos e interfaces TypeScript compartidos.

### router

Configuración de navegación y rutas.

### styles

Estilos globales de Pizca.

## Build

Comprobar que TypeScript y el build de producción funcionan:

~~bash
docker compose exec frontend npm run build
~~

## Arquitectura

`pizca_frontend` y `pizca_assistant` son proyectos independientes.

~~text
pizca_frontend
React + TypeScript
       │
       │ HTTP
       ▼
pizca_assistant
Pizca API
       │
       ├── PostgreSQL
       ├── Redis
       └── Workers
~~

El frontend no accede directamente a la base de datos, Redis, workers ni servicios internos del backend.

Toda comunicación se realiza a través de Pizca API.

## Convención de commits

El proyecto utiliza **Conventional Commits** para mantener un historial de Git claro, consistente y fácil de revisar.

Formato:

```text
tipo(área): descripción corta
```

### Tipos

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de errores |
| `refactor` | Reorganización de código sin cambiar su comportamiento |
| `style` | Cambios visuales o de estilos |
| `test` | Creación o modificación de tests |
| `docs` | Cambios de documentación |
| `chore` | Configuración, dependencias, Docker o tooling |

### Áreas

Utilizar como área la parte del frontend afectada por el cambio.

Áreas habituales:

```text
auth
imports
library
recipes
cooking
conversation
api
router
ui
layout
docker
config
```

Se pueden añadir nuevas áreas cuando la arquitectura del frontend lo requiera.

### Ejemplos

```text
feat(auth): add login page
feat(imports): add recipe import form
feat(cooking): add step navigation
fix(api): handle unauthorized responses
style(ui): add recipe card styles
refactor(api): simplify request client
test(auth): add login tests
docs(readme): document local development
chore(docker): update development container
```

### Regla principal

Un commit debe representar **un cambio lógico y coherente que funcione por sí mismo**.

No se crean commits por cada archivo modificado ni se agrupan cambios independientes únicamente por haberse realizado al mismo tiempo.

Antes de realizar un commit:

1. Comprobar los archivos modificados con `git status`.
2. Añadir únicamente los archivos relacionados con el cambio.
3. Comprobar que el proyecto compila y funciona.
4. Realizar el commit siguiendo la convención definida.

