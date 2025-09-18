import useGlobal from "./hooks/useGlobal.jsx";
//import "./CSS/UserInput.css";
import { Link } from "react-router-dom";
function UserInput() {
  const { state, dispatch } = useGlobal();
  const handleInput = (e) => {
    dispatch({
      type: "userInput",
      payload: { id: e.target.id, value: e.target.value },
    });
  };
  const handleSubmit = (e) => {
    dispatch({ type: "isLoading", payload: true });
    e.preventDefault();
    dispatch({ type: "SET_UserInput", payload: { ...state.userInput } });
    dispatch({ type: "isEditing", payload: false });
    dispatch({ type: "isLoading", payload: false });
  };
  return (
    <div className="main-container">
      {state.user ? `${state.user.name} Info` : "User Info"}
      {state.isEditing ? (
        <div className="edit-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={state.userInput.name}
              id="name"
              onChange={handleInput}
              placeholder="Name"
            />
            <input
              type="text"
              value={state.userInput.bio}
              id="bio"
              onChange={handleInput}
              placeholder="Bio"
            />
            <input
              type="text"
              value={state.userInput.location}
              id="location"
              onChange={handleInput}
              placeholder="Location"
            />
            <button className="btn" type="submit">
              {state.isLoading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
      ) : (
        <div className="user-input">
          <p>{state.userInput.name || "No Name Provided"}</p>
          <p>{state.userInput.bio || "No Bio Provided"}</p>
          <p>{state.userInput.location || "No Location Provided"}</p>
          <button
            className="btn"
            onClick={() => dispatch({ type: "isEditing", payload: true })}
          >
            Edit
          </button>
        </div>
      )}
      <Link to="/todo">ToDo Input</Link>
    </div>
  );
}

export default UserInput;
