# demo-nyxory

A small Hono server for the Forge Labs UG demo. It serves a static Todo UI and an in-memory REST API.

## Quick start

```bash
npm install
npm start
```

The process listens on `PORT` (default `3000`) and `0.0.0.0`.

Open [http://localhost:3000](http://localhost:3000) for the Todo UI. Health check: `GET /health` returns `ok`.

### Docker

```bash
docker build -t demo-nyxory .
docker run --rm -p 3000:3000 demo-nyxory
```

The image is based on `node:22-alpine` and exposes port `3000`.

## Project layout

| Path | Role |
|------|------|
| `src/index.js` | Hono app, Todo API, static serving |
| `public/` | Todo UI (`index.html`, `app.js`, `style.css`) |
| `Dockerfile` | Production-style Node 22 Alpine image |
| `docs/` | API and development notes |

## Documentation

- [Overview](docs/overview.md)
- [API](docs/api.md)
- [Development](docs/development.md)

## Dependencies

Runtime dependencies (see `package.json`):

- [hono](https://www.npmjs.com/package/hono)
- [@hono/node-server](https://www.npmjs.com/package/@hono/node-server)

Start script: `node src/index.js` (`npm start`).
