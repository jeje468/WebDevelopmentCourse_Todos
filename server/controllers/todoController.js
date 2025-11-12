import * as todoRepository from "../repositories/todoRepository.js";
import * as taskRepository from "../repositories/taskRepository.js";

const create = async (c) => {
  const user = c.get("user");
  const todo = await c.req.json();
  if (!todo.name) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const newTodo = await todoRepository.create(user.id, todo);
  return c.json(newTodo, 201);
};

const readAll = async (c) => {
  const user = c.get("user");
  const todos = await todoRepository.findAll(user.id);
  return c.json(todos);
};

const readOne = async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid id" }, 400);
  }

  const todo = await todoRepository.findById(id, user.id);

  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(todo);
};

const update = async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid id" }, 400);
  }

  const existingTodo = await todoRepository.findById(id, user.id);

  if (!existingTodo) {
    return c.json({ error: "Not found" }, 404);
  }

  const todo = await c.req.json();
  if (!todo.name || !todo.created_at) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const updatedTodo = await todoRepository.updateById(id, todo, user.id);

  if (!updatedTodo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(updatedTodo);
};

const deleteOne = async (c) => {
  const user = c.get("user");
  const id = Number(c.req.param("todoId"));
  if (!Number.isInteger(id)) {
    return c.json({ error: "Invalid id" }, 400);
  }

  const deletedTodo = await todoRepository.deleteById(id, user.id);

  if (!deletedTodo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(deletedTodo);
};

const stats = async (c) => {
  const user = c.get("user");
  const allTodos = await todoRepository.findAll();
  const allTasks = await taskRepository.findAll();

  const stats = {
    todos: allTodos.length,
    tasks: allTasks.length,
  };

  return c.json(stats);
};

export { create, deleteOne, readAll, readOne, update, stats };