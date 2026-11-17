# g-scores
GO assessment\

## Tech Stack
A fullstack web application built with **React, Node.js, and TypeScript**, organized as a monorepo using **pnpm Workspaces**.

### Frontend
- **React 19** — UI library
- **TypeScript 6** — Type safety
- **Vite 8** — Development server and build tool
- **Tailwind CSS 4** — Styling
- **React Router 7** — Client-side routing
- **TanStack Query 5** — Server state management

### Backend
- **Node.js 24** — JavaScript runtime
- **Express 5** — REST API framework
- **TypeScript 6** — Type safety
- **tsx** — TypeScript execution and watch mode
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment variable management

### Development Tools
- **pnpm Workspaces** — Monorepo and dependency management
- **Docker & Docker Compose** — Containerized development
- **ESLint** — Code linting

## Project Structure

```text
.
├── apps/
│   ├── web/                  # React frontend
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── backend/              # Backend
│       ├── src/
│       │   ├── app.ts
│       │   └── server.ts
│       ├── package.json
│       └── tsconfig.json
│
├── Dockerfile.dev
├── compose.yaml
├── .dockerignore
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Prerequisites

Choose one of the following development methods.

**Docker (Recommended)**
- Docker Desktop
- Docker Compose v2

**Without Docker**
- Node.js 24
- pnpm (version compatible with the project lockfile)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hocvn/g-scores.git
cd g-scores
```

### 2. Configure environment variables

If environment example files are provided, copy them to the appropriate `.env` files and configure the required values.

Never commit credentials, API keys, or other secrets.

### 3. Run with Docker (Recommended)

Build and start all services:

```bash
docker compose up --build
```

Run containers in the background:

```bash
docker compose up -d --build
```

Stop all services:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

### 4. Run without Docker

Install dependencies from the project root:

```bash
pnpm install
```

Start both frontend and backend:

```bash
pnpm dev
```

Or run each application separately:

**Frontend**

```bash
pnpm --filter @app/web dev
```

**Backend**

```bash
pnpm --filter backend dev
```

## Local URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| API Health Check | http://localhost:3000/api/health |

## API Proxy

During development, Vite forwards requests starting with `/api` to the backend.

When running with Docker Compose:

```ts
proxy: {
  "/api": {
    target: "http://api:3000",
    changeOrigin: true
  }
}
```

The `api` hostname refers to the Docker Compose service.

When running without Docker, the proxy target must resolve to the locally running backend, typically `http://localhost:3000`.

## Available Commands

| Command | Description |
|---|---|
| `pnpm install` | Install workspace dependencies |
| `pnpm dev` | Start frontend and backend |
| `pnpm --filter @app/web dev` | Start frontend only |
| `pnpm --filter backend dev` | Start backend only |
| `pnpm --filter @app/web build` | Build frontend |
| `pnpm --filter backend build` | Compile backend TypeScript |
| `pnpm --filter @app/web lint` | Run frontend ESLint |
| `docker compose up --build` | Build and start Docker services |
| `docker compose down` | Stop Docker services |
| `docker compose logs -f` | View Docker logs |

## Development Notes

- Run `pnpm install` from the repository root to maintain a consistent workspace lockfile.
- Frontend changes are automatically reflected through Vite HMR.
- Backend changes automatically restart the server through `tsx watch`.
- Docker Compose provides an internal network for communication between services.
- The `node_modules` directories are excluded from Git.
- Environment files containing secrets must not be committed.

## Production

Update later.