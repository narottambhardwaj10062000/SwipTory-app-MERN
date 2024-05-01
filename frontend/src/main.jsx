import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StoryContextProvider } from "./context/StoryContext.jsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  

  <SnackbarProvider
    autoHideDuration={2000}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <StoryContextProvider>
      <App />
    </StoryContextProvider>
  </SnackbarProvider>

  // </React.StrictMode>,
);
