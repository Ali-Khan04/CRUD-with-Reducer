import useGlobal from "./hooks/useGlobal";

function TodoInput() {
  const { state, dispatch } = useGlobal();

  const handleInput = (e) => {
    dispatch({
      type: "todoInput",
      payload: { id: e.target.id, value: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Todo", state.todoInput);
    const { title, goal } = state.todoInput;

    dispatch({ type: "isLoading", payload: true });

    const tempId = `temp_${Date.now()}`;
    dispatch({ type: "todo", payload: { ...state.todoInput, id: tempId } });

    try {
      const res = await fetch("http://localhost:3000/todo/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, goal }),
        credentials: "include",
      });
      const data = await res.json();
      console.log("Posting Todo", data);

      if (res.ok && data.success) {
        dispatch({
          type: "updateTodoId",
          payload: {
            tempId: tempId,
            realId: data.todo.id,
            updatedTodo: data.todo,
          },
        });
        dispatch({ type: "errorMessage", payload: false });
        dispatch({
          type: "successMessage",
          payload: "Todo created successfully!",
        });
        console.log("Saved Todo with ID:", data.todo.id);

        dispatch({ type: "resetTodo" });
      } else {
        dispatch({ type: "deleteTodo", payload: tempId });
        dispatch({ type: "errorMessage", payload: true });
      }
    } catch (error) {
      console.error("Error in saving todos", error);

      dispatch({ type: "deleteTodo", payload: tempId });
      dispatch({ type: "errorMessage", payload: true });
    }

    dispatch({ type: "isLoading", payload: false });

    setTimeout(() => {
      dispatch({ type: "clearMessage" });
    }, 2000);
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
            required
          />
          <input
            type="text"
            id="goal"
            value={state.todoInput.goal}
            placeholder="Description"
            onChange={handleInput}
            required
          />
          <button className="btn" type="submit" disabled={state.isLoading}>
            {state.isLoading ? "Adding..." : "Add"}
          </button>
        </form>
        {state.errorMessage && (
          <p style={{ color: "red" }}>Error Saving todo into DataBase</p>
        )}
        {state.successMessage && (
          <p style={{ color: "green" }}>{state.successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default TodoInput;
