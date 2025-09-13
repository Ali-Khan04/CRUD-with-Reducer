import useGlobal from "./hooks/useGlobal";
import TodoInput from "./TodoInput";

function RenderTodo() {
  const { state, dispatch } = useGlobal();

  const handleInput = (e) => {
    dispatch({
      type: "todoInput",
      payload: { id: e.target.id, value: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "setTodo",
      payload: { id: state.isEditing, ...state.todoInput },
    });
    dispatch({ type: "isEditing", payload: null });
  };

  return (
    <>
      {state.isEditing === null && <TodoInput />}

      <div className="mainRender-container">
        {state.isEditing === null ? (
          state.todo.map((item) => (
            <div key={item.id} className="todo-container">
              <h3>{item.title}</h3>
              <p>{item.goal}</p>
              <div className="btn-container">
                <button
                  onClick={() =>
                    dispatch({ type: "isEditing", payload: item.id })
                  }
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "deleteTodo", payload: item.id })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="edit-container">
            <h2 style={{ color: "#bb86fc", marginBottom: "1rem" }}>
              Edit Todo
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={state.todoInput.title}
                id="title"
                placeholder="Title"
                onChange={handleInput}
              />
              <input
                type="text"
                value={state.todoInput.goal}
                id="goal"
                placeholder="Description"
                onChange={handleInput}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn" type="submit">
                  Save
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => dispatch({ type: "isEditing", payload: null })}
                  style={{ background: "linear-gradient(135deg, #666, #888)" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default RenderTodo;
