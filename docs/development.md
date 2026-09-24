# Development

## Requirements

- Node.js (the Docker image uses Node 22; `@hono/node-server` declares `node >= 18.14.1`)
- npm (lockfile present: `package-lock.json`)

## Install and run

```bash
npm install
npm start
```

`npm start` runs `node src/index.js`.

Environment:

| Variable | Default | Meaning |
|----------|---------|---------|
| `PORT` | `3000` | Listen port |

The server binds to hostname `0.0.0.0`.

## Docker

```bash
docker build -t demo-nyxory .
docker run --rm -p 3000:3000 demo-nyxory
```

The Dockerfile:

1. Uses `node:22-alpine`
2. Runs `npm install --omit=dev`
3. Copies `src/` and `public/`
4. Sets `ENV PORT=3000` and `EXPOSE 3000`
5. Starts with `npm start`

## Contributor notes

Facts from this repository only:

- Package name: `demo-nyxory` (`private: true`, `"type": "module"`)
- Entry point: `src/index.js`
- UI assets live in `public/` and are served by the same process
- There is no test script, lint script, or separate config beyond `package.json` / `Dockerfile` / `.gitignore`
- `.gitignore` ignores `node_modules`

When changing behavior, keep `docs/api.md` aligned with `src/index.js`, and keep the README quick start aligned with `package.json` scripts and the Dockerfile.
