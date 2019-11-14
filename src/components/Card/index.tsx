import * as React from "react";
import { Wrapper, Position, Cord, Title } from "./styled";

export const Card = ({ title, position, latitude, longitude, color }) => (
  <Wrapper color={color}>
    <Title>{title}</Title>
    <Position>Punto {position}</Position>
    <Cord>Lat: {latitude}</Cord>
    <Cord>Lon: {longitude}</Cord>
  </Wrapper>
);
