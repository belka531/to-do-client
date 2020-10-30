import React from "react";
import { Provider } from 'react-redux';
import store from './store';
import AddTodo from './components/AddTodo'
import TodoList from "./components/TodoList.js";
import Filters from './components/Filters'
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>todos</h1>
        <div className="Container">
          <AddTodo />
          <TodoList />
          <Filters />
        </div>
      </div>
    </Provider>
  );
}

export default App;
