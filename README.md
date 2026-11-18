# G-Scores

GO assessments

G-Scores is a web application for exploring Vietnam's 2024 high-school examination results. It lets users look up a candidate by registration number, compare score distributions, and view the top candidates in Group A (Mathematics, Physics, and Chemistry).

**Live demo:** [g-scores-seven.vercel.app](https://g-scores-seven.vercel.app/)

## Features

- Dashboard with subject-level totals, score thresholds, and score-spectrum charts.
- Candidate score search by registration number.
- Reports with score distribution by subject and the top 10 Group A candidates.
- Persistent light and dark themes.

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, TanStack Query, and Recharts.
- Backend: NestJS, TypeScript, Prisma, and PostgreSQL.
- Tooling: pnpm workspaces, Docker Compose, and ESLint.

## Project structure

```text
.
├── apps/
│   ├── backend/       # NestJS API and Prisma schema/migrations
│   └── web/           # React/Vite application
├── data/              # Source CSV and import script
├── compose.yaml       # Development Docker Compose stack
└── Dockerfile.dev     # Development image
```

## Run locally with Docker

### Prerequisites

- Docker Desktop with Docker Compose v2

### Start the application

1. Create a root `.env` file from the example and fill in the PostgreSQL credentials:

   ```sh
   cp .env.example .env
   ```

   Example values:

   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=gscores
   ```

2. Build and start the containers:

   ```sh
   docker compose up --build -d
   ```

3. Create the database schema and import the supplied CSV data:

   ```sh
   docker compose exec api pnpm --filter backend db:deploy
   docker compose exec api pnpm import:scores
   ```

4. Open the application at [http://localhost:5173](http://localhost:5173). The API is available at [http://localhost:3000/api](http://localhost:3000/api).

The development containers install dependencies from `pnpm-lock.yaml` before starting. This keeps Docker's `node_modules` volumes in sync after dependencies change.

### Stop the stack

```sh
docker compose down
```

To also remove the PostgreSQL data volume, run `docker compose down -v`.

## Run locally without Docker

### Prerequisites

- Node.js 22 or newer
- pnpm (enable it with `corepack enable` if needed)
- PostgreSQL 17 or a compatible PostgreSQL instance

### Setup

1. Install workspace dependencies from the repository root:

   ```sh
   pnpm install
   ```

2. Create `apps/backend/.env` from its example:

   ```sh
   cp apps/backend/.env.example apps/backend/.env
   ```

   Configure it for your PostgreSQL database:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gscores
   ```

3. Create the schema:

   ```sh
   pnpm --filter backend db:deploy
   ```

4. Import the source dataset. Set `DATABASE_URL` for this command to the same connection string used above:

   ```sh
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gscores pnpm import:scores
   ```

   In PowerShell:

   ```powershell
   $env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/gscores"
   pnpm import:scores
   ```

5. Start the frontend and backend in development mode:

   ```sh
   pnpm dev
   ```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` requests to the backend at `http://localhost:3000`.

## Useful commands

| Command                           | Description                                           |
| --------------------------------- | ----------------------------------------------------- |
| `pnpm dev`                        | Start frontend and backend development servers.       |
| `pnpm build`                      | Build both applications.                              |
| `pnpm lint`                       | Lint the frontend.                                    |
| `pnpm typecheck`                  | Type-check the backend.                               |
| `pnpm import:scores`              | Import `data/diem_thi_thpt_2024.csv` into PostgreSQL. |
| `pnpm --filter backend db:deploy` | Apply Prisma migrations.                              |

## API endpoints

| Method | Endpoint                                   | Description                                     |
| ------ | ------------------------------------------ | ----------------------------------------------- |
| `GET`  | `/api/scores/:sbd`                         | Get one candidate's scores.                     |
| `GET`  | `/api/reports/subject-distribution`        | Get score-level distribution for every subject. |
| `GET`  | `/api/reports/top-group-a`                 | Get top Group A candidates.                     |
| `GET`  | `/api/reports/score-spectrum?subject=toan` | Get score counts for one subject.               |

Supported values for `subject` are `toan`, `ngu_van`, `ngoai_ngu`, `vat_li`, `hoa_hoc`, `sinh_hoc`, `lich_su`, `dia_li`, and `gdcd`.
