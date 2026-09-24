import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const todos = [];
let nextId = 1;

const app = new Hono();

app.get("/health", (c) => c.text("ok"));

app.get("/api/todos", (c) => c.json(todos));

app.post("/api/todos", async (c) => {
  const body = await c.req.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";

  if (!title) {
    return c.json({ error: "title is required" }, 400);
  }

  const todo = { id: String(nextId++), title, done: false };
  todos.push(todo);
  return c.json(todo, 201);
});

app.patch("/api/todos/:id", async (c) => {
  const id = c.req.param("id");
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return c.json({ error: "not found" }, 404);
  }

  const body = await c.req.json();
  if (typeof body.done === "boolean") {
    todo.done = body.done;
  }

  return c.json(todo);
});

app.delete("/api/todos/:id", (c) => {
  const id = c.req.param("id");
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return c.json({ error: "not found" }, 404);
  }

  todos.splice(index, 1);
  return c.body(null, 204);
});

app.get("/", (c) => {
  const html = readFileSync(join(publicDir, "index.html"), "utf8");
  return c.html(html);
});

app.use("/style.css", serveStatic({ root: publicDir }));
app.use("/app.js", serveStatic({ root: publicDir }));

const port = Number(process.env.PORT) || 3000;
serve({ fetch: app.fetch, hostname: "0.0.0.0", port });
