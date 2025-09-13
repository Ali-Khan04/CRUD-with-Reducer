import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalContext from "./Context/GlobalContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalContext>
    <App />
  </GlobalContext>
);
