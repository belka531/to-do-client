import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos, selectFilter } from '../redux/selectors';
import { getTodos, removeTodo, updateTodo, getActiveTodos, getCompletedTodos } from '../redux/actions';
import deleteIcon from "../images/remove-icon.svg";
import "../App.css";

function TodoList() {

  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await dispatch(removeTodo(id));
    } catch (err) { }
  };

  const update = async (e, id) => {
    try {
      e.stopPropagation();
      const payload = { active: !todos.find(todo => todo.id === id).active }
      await dispatch(updateTodo(id, payload));

      if (filter === 'all') {
        dispatch(getTodos());
      } else if (filter === 'completed') {
        dispatch(getCompletedTodos());
      } else {
        dispatch(getActiveTodos());
      }
    } catch (err) { }
  }

  return (
    <div>
      {todos.length > 0 && <ul >
        {todos.map(({ id, name, active }, i) => (
          <li key={i} onClick={e => update(e, id)} className={!active ? "completed" : ""}>
            <label>{name}</label>
            <img onClick={e => deleteTodo(e, id)} src={deleteIcon} alt="deleteIcon"></img>
          </li>
        ))}
      </ul>}
    </div>
  );
}

export default TodoList;