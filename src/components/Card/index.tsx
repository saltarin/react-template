import * as React from "react";
import { Wrapper, Position, Cord, Title } from "./styled";

export const Card = ({ title, position, latitude, longitude, distance,color }) => (
  <Wrapper color={color}>
    <Title>{title}</Title>
    <Position>Punto {position}</Position>
    <Cord>Lat: {latitude}</Cord>
    <Cord>Lon: {longitude}</Cord>
    <Cord>Dist: {distance}</Cord>
  </Wrapper>
);
