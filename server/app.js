import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import * as todoController from "./controllers/todoController.js";
import * as taskController from "./controllers/taskController.js";
import * as authController from "./controllers/authController.js";

import * as middlewares from "./middlewares.js";

const app = new Hono();

app.use("/*", cors());

app.use("/api/todos/*", middlewares.authenticate);
app.get("/api/todos", todoController.readAll);
app.get("/api/todos/:todoId", todoController.readOne);
app.post("/api/todos", todoController.create);
app.put("/api/todos/:todoId", todoController.update);
app.delete("/api/todos/:todoId", todoController.deleteOne);

app.post("/api/todos/:todoId/tasks", taskController.create);
app.get("/api/todos/:todoId/tasks", taskController.readAll);
app.get("/api/todos/:todoId/tasks/:taskId", taskController.readOne);
app.put("/api/todos/:todoId/tasks/:taskId", taskController.update);
app.delete("/api/todos/:todoId/tasks/:taskId", taskController.deleteOne);

app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

app.use("/api/admin/stats", middlewares.authenticate, middlewares.requireAnyRole("ADMIN"));
app.get("/api/admin/stats", todoController.stats);

export default app;