import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  width: 200px;
  height: 100px;
  border: 2px dashed ${props => props.color};
  border-radius: 10px;
  padding: 4px;
`;

export const Position = styled.p`
  color: blue;
  margin: 0;
`;

export const Title = styled.p`
  margin-top: 0;
`;

export const Cord = styled.p`
  margin: 0;
`;
