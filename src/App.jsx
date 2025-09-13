import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserInput from "./UserInput";
import "./CSS/UnifiedStyling.css";

import RenderTodo from "./RenderTodo";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route path="/todo" element={<RenderTodo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
