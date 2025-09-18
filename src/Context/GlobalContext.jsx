import { UserContext } from "./UserContext.jsx";
import { useReducer } from "react";

const initialState = {
  userInput: {
    name: "",
    bio: "",
    location: "",
  },
  todoInput: {
    title: "",
    goal: "",
  },
  signIn: {
    email: "",
    password: "",
  },
  signUp: {
    name: "",
    email: "",
    password: "",
  },
  todo: [],
  user: null,
  setPassword: false,
  isEditing: null,
  isLoading: false,
  successMessage: null,
  errorMessage: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "userInput":
      return {
        ...state,
        userInput: {
          ...state.userInput,
          [action.payload.id]: action.payload.value,
        },
      };
    case "SET_UserInput":
      return { ...state, userInput: { ...state.userInput, ...action.payload } };
    case "todoInput":
      return {
        ...state,
        todoInput: {
          ...state.todoInput,
          [action.payload.id]: action.payload.value,
        },
      };
    case "todo":
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case "updateTodoId":
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === action.payload.tempId
            ? { ...action.payload.updatedTodo, id: action.payload.realId }
            : item
        ),
      };
    case "setTodo":
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    case "user":
      return { ...state, user: action.payload };

    case "SignIn":
      return {
        ...state,
        signIn: { ...state.signIn, [action.payload.id]: action.payload.value },
      };
    case "SignUp":
      return {
        ...state,
        signUp: { ...state.signUp, [action.payload.id]: action.payload.value },
      };
    case "deleteTodo":
      return {
        ...state,
        todo: state.todo.filter((item) => item.id !== action.payload),
      };
    case "isEditing":
      return { ...state, isEditing: action.payload };
    case "isLoading":
      return { ...state, isLoading: action.payload };
    case "setPassword":
      return { ...state, setPassword: action.payload };
    case "successMessage":
      return { ...state, successMessage: action.payload };
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "clearMessage":
      return {
        ...state,
        successMessage: null,
        errorMessage: null,
      };
    case "resetTodo":
      return {
        ...state,
        todoInput: {
          title: "",
          goal: "",
        },
      };
    default:
      return state;
  }
};
function GlobalContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default GlobalContext;
