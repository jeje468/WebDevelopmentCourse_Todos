import { PUBLIC_API_URL } from "$env/static/public";
import { authFetch } from "$lib/utils/fetchUtils.js";

const readTasks = async (todoId) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`);
  return res.json();
};

const readTask = async (todoId, taskId) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`);
  return res.json();
};

const createTask = async (todoId, task) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(task),
  });
  return res.json();
};

const updateTask = async (todoId, taskId, task) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(task),
  });
  return res.json();
};

const deleteTask = async (todoId, taskId) => {
  const res = await authFetch(`${PUBLIC_API_URL}/api/todos/${todoId}/tasks/${taskId}`, {
    method: "DELETE",
  });
  return res.json();
};

export {
  createTask,
  deleteTask,
  readTask,
  readTasks,
  updateTask,
};