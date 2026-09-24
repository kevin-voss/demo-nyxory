import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json({ ok: true, service: "demo-nyxory" }));
app.get("/health", (c) => c.text("ok"));

const port = Number(process.env.PORT) || 3000;
serve({ fetch: app.fetch, hostname: "0.0.0.0", port });
