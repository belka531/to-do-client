import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import deleteIcon from "./images/remove-icon.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    fetchTodoAndSetTodos();
  }, []);

  const fetchTodoAndSetTodos = async () => {
    const todos = await APIHelper.getAllTodos();
    setTodos(todos);
    setSelectedButton("all");
  };

  const createTodo = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!todo) {
        return;
      }

      const newTodo = await APIHelper.createTodo(todo);
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ id: i }) => id !== i));
    } catch (err) { }
  };

  const updateTodo = async (e, id) => {
    try {
      e.stopPropagation();
      const payload = { active: !todos.find(todo => todo.id === id).active }
      await APIHelper.updateTodo(id, payload);
    } catch (err) { }

    fetchTodoAndSetTodos();
  };

  const getActiveTodos = async (e) => {
    e.stopPropagation();
    const activeTodos = await APIHelper.getActiveTodos();
    setTodos(activeTodos);
    setSelectedButton("active");
  };

  const getCompletedTodos = async (e) => {
    e.stopPropagation();
    const completedTodos = await APIHelper.getCompletedTodos();
    setTodos(completedTodos);
    setSelectedButton("completed");
  };


  return (
    <div>
      <h1>todos</h1>
      <div className="Container">
        <input type="text" value={todo} onChange={({ target }) => setTodo(target.value)} onKeyDown={createTodo} placeholder="What needs to be done?" />
        {todos.length > 0 && <ul>
          {todos.map(({ id, name, active }, i) => (
            <li key={i} onClick={e => updateTodo(e, id)} className={!active ? "completed" : ""}>
              <label>{name}</label>
              <img onClick={e => deleteTodo(e, id)} src={deleteIcon} alt="deleteIcon"></img>
            </li>
          ))}
        </ul>}
        <footer>
          <button type="button" onClick={fetchTodoAndSetTodos} className={selectedButton === "all" ? "selected" : ""}>All</button>
          <button type="button" onClick={getActiveTodos} className={selectedButton === "active" ? "selected" : ""}>Active</button>
          <button type="button" onClick={getCompletedTodos} className={selectedButton === "completed" ? "selected" : ""}>Completed</button>
        </footer>
      </div>
    </div>
  );
}

export default App;
