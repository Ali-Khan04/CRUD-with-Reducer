import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import "../CSS/SignUp.css";
import { Link } from "react-router-dom";

function SignIn() {
  const { state, dispatch } = useContext(UserContext);
  const handleInput = (e) => {
    dispatch({
      type: "SignIn",
      payload: { id: e.target.id, value: e.target.value },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state.signIn;
    console.log(`User Data : email : ${email} password: ${password}`);
  };
  return (
    <div className="signUp-container">
      <h1 style={{ color: "white" }}>Sign In</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            id="email"
            value={state.signIn.email || ""}
            onChange={handleInput}
            placeholder="Email"
          />
          <div className="password-container">
            <input
              type={state.setPassword ? "text" : "password"}
              required
              id="password"
              value={state.signIn.password || ""}
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
          to="/signup"
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
          No account? Sign Up!
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
