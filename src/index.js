import React from "react";
import ReactDOM from "react-dom/client";
import Timeline from "./Timeline";

function App() {
  return (
    <div>
      <h2>Timeline Component {"\u2728"}</h2>
      <Timeline />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);