import { browser } from "$app/environment";
import * as tasksApi from "$lib/apis/tasksApi.js";

let taskState = $state([]);

const initTodoTasks = async (todoId) => {
  if (!browser) {
    return;
  }
  taskState[todoId] = await tasksApi.readTasks(todoId);
};

const useTaskState = () => {
  return {
    get tasks() {
      return taskState;
    },
    addTask: async (todoId, task) => {
      const newTask = await tasksApi.createTask(todoId, task);
      const tasks = taskState[todoId] || [];
      tasks.push(newTask);
      taskState[todoId] = tasks;
    },
    removeTask: async(todoId, taskId) => {
      const removed = await tasksApi.deleteTask(todoId, taskId);
      taskState[todoId] = taskState[todoId].filter(t => t.id !== removed.id);
    },
    toggleTask: async (todoId, taskId) => {
      if (taskState[todoId]) {
        const task = taskState[todoId].find(t => t.id === taskId);
        if (task) {
          task.is_done = !task.is_done;
          await tasksApi.updateTask(todoId, taskId, task);
        }
      }
    },
  };
};

export { initTodoTasks, useTaskState };