import * as React from "react";
import { Card } from "../Card";
import { Wrapper } from "./styled";

interface Props {
  points: object[];
}

export class Waypoints extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        {this.props.points.map((point, index) => (
          <Card
            key={index}
            title={`parada: ${index + 1}`}
            position={index + 1}
            latitude={point.lat}
            longitude={point.lng}
            color="green"
          />
        ))}
      </Wrapper>
    );
  }
}
