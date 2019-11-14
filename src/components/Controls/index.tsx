import * as React from "react";
import { Wrapper } from "./styled";

export const Controls = ({ addClickhandler, routingClickHandler }) => (
  <Wrapper>
    <button onClick={addClickhandler}>Agregar Punto</button>
    <button onClick={routingClickHandler}>Rutear</button>
  </Wrapper>
);
