import Board from "../Board/Board";
import { BoardsContext } from "./Boards.styled";
import PropTypes from "prop-types";

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

Boards.propTypes = {
  boards: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.object),
    })
  ),
  handleAddSubmit: PropTypes.func,
  newItemToProcess: PropTypes.string,
  newItemToDone: PropTypes.string,
  handleAddChange: PropTypes.func,
  handleDeleteSubmit: PropTypes.func,
  handleEditSet: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default Boards;
