import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";

export const TaskContainer = styled(Draggable)``;

export const TaskBody = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;
  padding: 10px;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: #ffffff;
  border-radius: 20px;
`;

export const TaskText = styled.p`
  width: 100px;
  min-height: 50px;
  overflow: hidden;
  text-align: left;
  display: flex;
  align-items: center;
  text-overflow: hidden;
  padding-left: 10px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Button = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: transparent;

  &:not(:last-of-type) {
    margin-right: 7px;
  }

  &:hover {
    opacity: 0.5;
  }
`;
