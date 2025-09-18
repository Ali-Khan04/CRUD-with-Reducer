import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserInput from "./UserInput";
import "./CSS/UnifiedStyling.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";

import RenderTodo from "./RenderTodo";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/userInfo" element={<UserInput />} />
          <Route path="/todo" element={<RenderTodo />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
