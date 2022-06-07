import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import { ReactComponent as EditIcon } from "../../images/edit.svg";

import {
  TaskContainer,
  TaskBody,
  TaskText,
  ButtonsContainer,
  Button,
} from "./Task.styled";

const Task = ({ index, handleDeleteSubmit, handleEditSet, board, item }) => {
  return (
    <TaskContainer draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <TaskBody
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
              ...provided.draggableProps.style,
            }}
          >
            <TaskText>{item.content}</TaskText>
            <ButtonsContainer>
              <Button
                onClick={(event) => handleDeleteSubmit(event, board, item)}
              >
                {<DeleteIcon fill={"#9c4444"} />}
              </Button>
              <Button onClick={(event) => handleEditSet(event, board, item)}>
                {<EditIcon fill={"#4cbcd8"} />}
              </Button>
            </ButtonsContainer>
          </TaskBody>
        );
      }}
    </TaskContainer>
  );
};

export default Task;
