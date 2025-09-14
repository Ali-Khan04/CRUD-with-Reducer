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
  setPassword: false,
  isEditing: null,
  isLoading: false,
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
        todo: [
          ...state.todo,
          { ...action.payload, id: Date.now() + Math.random() },
        ],
      };
    case "setTodo":
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };

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
