import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getTodos, getActiveTodos, getCompletedTodos } from '../redux/actions';

function Filters() {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState("all");

  const getActiveTodoList = async (e) => {
    try {
      e.preventDefault();
      setSelectedButton("active");
      await dispatch(getActiveTodos());
    } catch (err) { }
  };

  const getCompletedTodoList = async (e) => {
    try {
      e.preventDefault();
      setSelectedButton("completed");
      await dispatch(getCompletedTodos());
    } catch (err) { }
  };

  const getTodoList = async (e) => {
    try {
      e.preventDefault();
      setSelectedButton("all");
      await dispatch(getTodos());
    } catch (err) { }
  };

  return (
    <footer>
      <button type="button" onClick={getTodoList} className={selectedButton === "all" ? "selected" : ""}>All</button>
      <button type="button" onClick={getActiveTodoList} className={selectedButton === "active" ? "selected" : ""}>Active</button>
      <button type="button" onClick={getCompletedTodoList} className={selectedButton === "completed" ? "selected" : ""}>Completed</button>
    </footer>
  );
}

export default Filters;