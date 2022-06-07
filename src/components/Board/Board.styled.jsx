import styled from "@emotion/styled";
import { Droppable } from "react-beautiful-dnd";

export const BoardContainer = styled.div`
  text-align: center;
  margin-right: 40px;
  align-self: flex-start;
`;
export const BoardTitle = styled.h2`
  text-transform: uppercase;
  color: white;
  text-shadow: 0px 0px 20px rgba(40, 134, 254, 1);
`;

export const BoardBody = styled(Droppable)``;
