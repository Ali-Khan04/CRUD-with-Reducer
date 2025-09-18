import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import "../CSS/SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const handleInput = (e) => {
    dispatch({
      type: "SignUp",
      payload: { id: e.target.id, value: e.target.value },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = state.signUp;
    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        dispatch({ type: "successMessage", payload: true });
        dispatch({ type: "errorMessage", payload: false });
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        dispatch({ type: "successMessage", payload: false });
        dispatch({ type: "errorMessage", payload: true });
      }
    } catch (error) {
      dispatch({ type: "successMessage", payload: false });
      dispatch({ type: "errorMessage", payload: true });
    }
  };
  return (
    <div className="signUp-container">
      <h1 style={{ color: "white" }}>Sign Up</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            id="name"
            value={state.signUp.name || ""}
            onChange={handleInput}
            placeholder="Name"
          />
          <input
            type="email"
            required
            id="email"
            value={state.signUp.email || ""}
            onChange={handleInput}
            placeholder="Email"
          />
          <div className="password-container">
            <input
              type={state.setPassword ? "text" : "password"}
              required
              id="password"
              value={state.signUp.password || ""}
              onChange={handleInput}
              placeholder="Password"
            />
            <button
              onClick={() =>
                dispatch({ type: "setPassword", payload: !state.setPassword })
              }
            >
              {state.setPassword ? "Hide" : "show"}
            </button>
          </div>

          <button type="submit">Submit </button>
        </form>
        <Link
          to="/signin"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            color: "#bb86fc",
            fontWeight: "500",
            textDecoration: "none",
            fontSize: "1rem",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#d4a8ff")}
          onMouseLeave={(e) => (e.target.style.color = "#bb86fc")}
        >
          Have a Account? Sign In!
        </Link>
        {state.successMessage && (
          <p style={{ color: "green" }}>Account Created !</p>
        )}
        {state.errorMessage && (
          <p style={{ color: "red" }}>Error Creating Account!</p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
