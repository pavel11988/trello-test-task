import Board from "../Board/Board";
import { BoardsContext } from "./Boards.styled";

const Boards = ({
  boards,
  handleAddSubmit,
  newItemToProcess,
  newItemToDone,
  handleAddChange,
  handleDeleteSubmit,
  handleEditSet,
  onDragEnd,
}) => {
  return (
    <BoardsContext onDragEnd={(result) => onDragEnd(result, boards)}>
      {Object.entries(boards).map(([id, board]) => {
        return (
          <Board
            key={id}
            id={id}
            board={board}
            handleDeleteSubmit={handleDeleteSubmit}
            handleEditSet={handleEditSet}
            handleAddSubmit={handleAddSubmit}
            newItemToProcess={newItemToProcess}
            newItemToDone={newItemToDone}
            handleAddChange={handleAddChange}
          />
        );
      })}
    </BoardsContext>
  );
};

export default Boards;
