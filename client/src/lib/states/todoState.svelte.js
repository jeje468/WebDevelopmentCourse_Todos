import { browser } from "$app/environment";
import * as todosApi from "$lib/apis/todosApi.js";

let todoState = $state([]);
let stats = $state();

const initTodos = async () => {
  if (browser) {
    todoState = await todosApi.readTodos();
  }
};

const initTodo = async (id) => {
  if (browser) {
    const todo = await todosApi.readTodo(id);
    if (todo && !todoState.find((t) => t.id === todo.id)) {
      todoState.push(todo);
    }
  }
};

const fetchStats = async () => {
  if (browser) {
    stats = await todosApi.readStats();
  }
};

const useTodoState = () => {
  return {
    get todos() {
      return todoState;
    },
    get stats(){
      return stats;
    },
    add: async (todo) => {
      const newTodo = await todosApi.createTodo(todo);
      todoState.push(newTodo);
    },
    remove: async (todo) => {
      const removed = await todosApi.deleteTodo(todo.id);
      todoState = todoState.filter((t) => t.id !== removed.id);
    },
    update: async (todo) => {
      const updatedTodo = await todosApi.updateTodo(todo.id, todo);
      const index = todoState.findIndex((t) => t.id === updatedTodo.id);
      if (index !== -1) {
        todoState[index] = updatedTodo;
      }
    },
  };
};

export { initTodos, initTodo, useTodoState };