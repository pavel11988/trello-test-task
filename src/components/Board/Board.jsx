import { BoardContainer, BoardTitle, BoardBody } from "./Board.styled";
import Task from "../Task/Task";
import CreateForm from "../CreateForm/CreateForm";
import PropTypes from "prop-types";

const Board = ({
  id,
  board,
  handleDeleteSubmit,
  handleEditSet,
  handleAddSubmit,
  newItemToProcess,
  newItemToDone,
  handleAddChange,
}) => {
  return (
    <BoardContainer
      style={{
        textAlign: "center",
        marginRight: 40,
      }}
      key={id}
    >
      <BoardTitle>{board.name}</BoardTitle>

      <BoardBody droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? "rgba(10, 108, 206, 0.9)"
                  : "rgba(204, 255, 255, 0.5)",
                padding: 4,
                width: 250,
                minHeight: 500,
                borderRadius: 20,
              }}
            >
              {board.items.map((item, index) => {
                return (
                  <Task
                    key={item.id}
                    index={index}
                    provided={provided}
                    snapshot={snapshot}
                    handleDeleteSubmit={handleDeleteSubmit}
                    handleEditSet={handleEditSet}
                    board={board}
                    item={item}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </BoardBody>

      <CreateForm
        board={board}
        handleAddSubmit={handleAddSubmit}
        newItemToProcess={newItemToProcess}
        newItemToDone={newItemToDone}
        handleAddChange={handleAddChange}
      />
    </BoardContainer>
  );
};

Board.propTypes = {
  id: PropTypes.string,
  board: PropTypes.exact({
    name: PropTypes.string,
    items: PropTypes.array,
  }),
  handleDeleteSubmit: PropTypes.func,
  handleEditSet: PropTypes.func,
  handleAddSubmit: PropTypes.func,
  newItemToProcess: PropTypes.string,
  newItemToDone: PropTypes.string,
  handleAddChange: PropTypes.func,
};

export default Board;
