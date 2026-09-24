# Overview

demo-nyxory is a fullstack Todo demo built with [Hono](https://hono.dev/) on `@hono/node-server`.

## What it does

- Serves a static Todo UI from `public/` at `GET /`
- Exposes an in-memory Todo API under `/api/todos`
- Provides a health check at `GET /health` (plain text `ok`)

Todos are stored in a process-local array in `src/index.js`. They are not persisted across restarts.

## Stack

| Piece | Source |
|-------|--------|
| HTTP framework | `hono` |
| Node adapter | `@hono/node-server` |
| UI | Static HTML/CSS/JS in `public/` |
| Container | `Dockerfile` (`node:22-alpine`) |

## Related docs

- [API](api.md) — routes and request/response shapes from `src/index.js`
- [Development](development.md) — local run, Docker, and layout notes
