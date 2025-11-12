import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils.js";

const readTodos = async () => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos`);
  return await res.json();
};

const readTodo = async (id) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${id}`);
  return await res.json();
};

const createTodo = async (todo) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(todo),
  });
  return await res.json();
};

const updateTodo = async (id, todo) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(todo),
  });
  return await res.json();
};

const deleteTodo = async (id) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

const readStats = async () => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/admin/stats`);
  return await res.json();
}

export { createTodo, deleteTodo, readTodo, readTodos, updateTodo };