import axios from "axios";

const API_URL = "http://localhost:8080/api/elements/"

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL);
  return todos;
}

async function createTodo(name) {
  const { data: newTodo } = await axios.post(API_URL, {
    name
  });
  return newTodo;
}

async function deleteTodo(id) {
  const { data }  = await axios.delete(`${API_URL}${id}`);
  return data.message;
}

async function updateTodo(id, payload) {
  const { data } = await axios.put(`${API_URL}${id}`, payload);
  return data.message;
}

async function getActiveTodos() {
  const { data: todos } = await axios.get(`${API_URL}/active/`)
  return todos;
}

async function getCompletedTodos() {
  const { data: todos } = await axios.get(`${API_URL}/completed/`)
  return todos;
}

export default { getAllTodos, createTodo, deleteTodo, updateTodo, getActiveTodos, getCompletedTodos };