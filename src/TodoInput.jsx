import useGlobal from "./hooks/useGlobal";
//import "./CSS/UserInput.css";
function TodoInput() {
  const { state, dispatch } = useGlobal();
  const handleInput = (e) => {
    dispatch({
      type: "todoInput",
      payload: { id: e.target.id, value: e.target.value },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "isLoading", payload: true });
    dispatch({ type: "todo", payload: state.todoInput });
    dispatch({ type: "isLoading", payload: false });
    console.log(state.todoInput);
  };
  return (
    <div className="main-container">
      <h1>Todo Input</h1>
      <div className="todoInput-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            value={state.todoInput.title}
            placeholder="Title"
            onChange={handleInput}
          />
          <input
            type="text"
            id="goal"
            value={state.todoInput.goal}
            placeholder="Description"
            onChange={handleInput}
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoInput;
