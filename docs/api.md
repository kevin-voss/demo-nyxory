# API

Routes implemented in `src/index.js`. The Todo collection is an in-memory array; it resets when the process exits.

## Health

### `GET /health`

Returns plain text:

```text
ok
```

## Static UI

### `GET /`

Returns the contents of `public/index.html` as HTML.

### Static assets

| Path | File |
|------|------|
| `/style.css` | `public/style.css` |
| `/app.js` | `public/app.js` |

## Todos

Todo objects have this shape:

```json
{
  "id": "1",
  "title": "Example",
  "done": false
}
```

`id` is a string assigned by the server. New todos start with `done: false`.

### `GET /api/todos`

Returns a JSON array of all todos.

### `POST /api/todos`

Request body (JSON):

```json
{
  "title": "Example"
}
```

- `title` must be a non-empty string after trim.
- On success: `201` and the created todo.
- If `title` is missing or empty: `400` with `{ "error": "title is required" }`.

### `PATCH /api/todos/:id`

Request body (JSON). Only `done` is applied when it is a boolean:

```json
{
  "done": true
}
```

- On success: `200` and the updated todo.
- If no todo matches `:id`: `404` with `{ "error": "not found" }`.

### `DELETE /api/todos/:id`

- On success: `204` with an empty body.
- If no todo matches `:id`: `404` with `{ "error": "not found" }`.
