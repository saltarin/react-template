import * as React from "react";
import { render } from "react-dom";
import { Container } from "./containers/Container";

import "leaflet/dist/leaflet.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
