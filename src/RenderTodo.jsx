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

  const handleEdit = (todo) => {
    dispatch({ type: "isEditing", payload: todo.id });

    dispatch({
      type: "todoInput",
      payload: { id: "title", value: todo.title },
    });
    dispatch({
      type: "todoInput",
      payload: { id: "goal", value: todo.goal },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, goal } = state.todoInput;

    console.log("Updating todo with ID:", state.isEditing);
    console.log("Update data:", { title, goal });

    if (state.isEditing.toString().startsWith("temp_")) {
      console.error("Cannot update a temporary todo");
      dispatch({ type: "errorMessage", payload: true });
      return;
    }
    dispatch({
      type: "setTodo",
      payload: { id: state.isEditing, title, goal },
    });

    try {
      const updateUrl = `http://localhost:3000/todo/update/${state.isEditing}`;
      console.log("Update URL:", updateUrl);

      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, goal }),
        credentials: "include",
      });
      const data = await res.json();
      console.log("Update Todo Response:", data);

      if (res.ok && data.success) {
        dispatch({ type: "errorMessage", payload: false });
        dispatch({
          type: "successMessage",
          payload: "Todo updated successfully!",
        });
      } else {
        console.error("Update failed:", data);
        dispatch({ type: "errorMessage", payload: true });
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      dispatch({ type: "errorMessage", payload: true });
    }

    dispatch({ type: "isEditing", payload: null });
    dispatch({ type: "resetTodo" });

    setTimeout(() => {
      dispatch({ type: "clearMessage" });
    }, 2000);
  };

  const handleDelete = async (todoId) => {
    console.log("Deleting todo with ID:", todoId);

    if (todoId.toString().startsWith("temp_")) {
      dispatch({ type: "deleteTodo", payload: todoId });
      return;
    }

    try {
      const deleteUrl = `http://localhost:3000/todo/delete/${todoId}`;

      const res = await fetch(deleteUrl, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        dispatch({ type: "deleteTodo", payload: todoId });
        dispatch({
          type: "successMessage",
          payload: "Todo deleted successfully!",
        });
      } else {
        console.error("Delete failed:", data);
        dispatch({ type: "errorMessage", payload: true });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      dispatch({ type: "errorMessage", payload: true });
    }

    setTimeout(() => {
      dispatch({ type: "clearMessage" });
    }, 2000);
  };
  return (
    <>
      {state.isEditing === null && <TodoInput />}

      <div className="mainRender-container">
        {state.isEditing === null ? (
          state.todo.length > 0 ? (
            state.todo.map((item) => (
              <div key={item.id} className="todo-container">
                <h3>{item.title}</h3>
                <p>{item.goal}</p>
                <div className="btn-container">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={item.id.toString().startsWith("temp_")}
                  >
                    Update
                  </button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666" }}>
              No todos yet. Create one above!
            </p>
          )
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
                required
              />
              <input
                type="text"
                value={state.todoInput.goal}
                id="goal"
                placeholder="Description"
                onChange={handleInput}
                required
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn" type="submit">
                  Save
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    dispatch({ type: "isEditing", payload: null });
                    dispatch({ type: "resetTodo" });
                  }}
                  style={{ background: "linear-gradient(135deg, #666, #888)" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          {state.errorMessage && (
            <p style={{ color: "red" }}>Error updating todo in the database</p>
          )}
          {state.successMessage && (
            <p style={{ color: "green" }}>{state.successMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RenderTodo;
