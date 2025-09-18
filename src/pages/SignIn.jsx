import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import "../CSS/SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const handleInput = (e) => {
    dispatch({
      type: "SignIn",
      payload: { id: e.target.id, value: e.target.value },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state.signIn;
    try {
      const res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        dispatch({ type: "user", payload: data.user });
        dispatch({ type: "successMessage", payload: true });
        dispatch({ type: "errorMessage", payload: false });
        setTimeout(() => {
          navigate("/todo");
        }, 100);
      } else {
        dispatch({ type: "successMessage", payload: false });
        dispatch({ type: "errorMessage", payload: true });
      }
    } catch (error) {
      console.error("Erro Sigining In", error);
      dispatch({ type: "successMessage", payload: false });
      dispatch({ type: "errorMessage", payload: true });
    }
    setTimeout(() => {
      dispatch({ type: "clearMessage" });
    }, 2000);
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
        {state.successMessage && (
          <p style={{ color: "green" }}> Sign In Successfull</p>
        )}
        {state.errorMessage && <p style={{ color: "red" }}>Error Signing In</p>}
      </div>
    </div>
  );
}

export default SignIn;
