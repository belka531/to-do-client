import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from '../redux/selectors';
import { addTodo } from '../redux/actions';

function AddTodo() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const todos = useSelector(selectTodos);

  const createTodo = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!todo) {
        return;
      } else if (todos.some(t => t['name'] === todo)) {
        return;
      }

      dispatch(addTodo(todo));
      setTodo("");
    }
  };

  return (
    <input
      type="text"
      value={todo}
      onChange={({ target }) => setTodo(target.value)}
      onKeyDown={createTodo}
      placeholder="What needs to be done?"
    />
  );
}

export default AddTodo;
