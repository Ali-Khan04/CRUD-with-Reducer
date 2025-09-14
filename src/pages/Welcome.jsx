import { Link } from "react-router-dom";
import "../CSS/Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>Welcome 🚀</h1>
        <p>
          This is a <span className="highlight">practice project</span> where I
          test out <b>CRUD</b> in frontend using{" "}
          <span className="highlight">React + useReducer + Context API</span>{" "}
          with a backend as well using{" "}
          <span className="highlight">Express and MongoDB</span>.
        </p>
        <div className="button-group">
          <Link to="/signup">
            <button className="action-btn">Sign Up</button>
          </Link>
          <Link to="/signin">
            <button className="action-btn">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
