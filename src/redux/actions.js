import axios from "axios";

const API_URL = "http://localhost:8080/api/elements/";

export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const GET_COMPLETED_TODOS = 'GET_COMPLETED_TODOS';
export const GET_ACTIVE_TODOS = 'GET_ACTIVE_TODOS';

export function getTodos() {
  return async dispatch => {
    const { data: todos } = await axios.get(API_URL);
    dispatch({ type: GET_TODOS, payload: todos })
  }
}

export function addTodo(name) {
  return async dispatch => {
    const { data: newTodo } = await axios.post(API_URL, {
      name
    });
    dispatch({ type: ADD_TODO, payload: newTodo })
  }
}

export const removeTodo = (id) => {
  return async dispatch => {
    await axios.delete(`${API_URL}${id}`);
    dispatch({ type: REMOVE_TODO, payload: id })
  }
}

export const updateTodo = (id, value) => {
  return async dispatch => {
    await axios.put(`${API_URL}${id}`, value);
    dispatch({ type: UPDATE_TODO, payload: value })
  }
}

export const getActiveTodos = () => {
  return async dispatch => {
    const { data: activeTodos } = await axios.get(`${API_URL}/active/`);
    dispatch({ type: GET_ACTIVE_TODOS, payload: activeTodos })
  }
}

export const getCompletedTodos = () => {
  return async dispatch => {
    const { data: completedTodos } = await axios.get(`${API_URL}/completed/`);
    dispatch({ type: GET_COMPLETED_TODOS, payload: completedTodos })
  }
}
