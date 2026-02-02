import React from "react";
import gymshark_logo from "./gymshark_logo.png";
import "./App.css";
import FormPage from "./pages/FormPage";
function App() {
  return (
    <div className="App">
      <img
        src="https://yurusen.github.io/gymshark-case-study-ui/gymshark_logo.png"
        alt="logo"
        width="450"
        className="gymshark-tint"
      />

      <div className="divider"></div>

      <FormPage />

      <div className="divider"></div>
    </div>
  );
}

export default App;
