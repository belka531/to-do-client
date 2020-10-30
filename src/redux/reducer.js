import {
  GET_TODOS,
  ADD_TODO,
  GET_ACTIVE_TODOS,
  GET_COMPLETED_TODOS,
  REMOVE_TODO
} from './actions';

const initialState = {
  todos: [],
  filter: 'all'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        filter: 'all'
      };
    case GET_ACTIVE_TODOS:
      return {
        ...state,
        todos: action.payload,
        filter: 'active'
      };
    case GET_COMPLETED_TODOS:
      return {
        ...state,
        todos: action.payload,
        filter: 'completed'
      };
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.every(todo => todo.active === false) && state.filter === 'completed' ? [...state.todos] : [...state.todos, action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      }
    default:
      return state
  }
}

export default reducer;