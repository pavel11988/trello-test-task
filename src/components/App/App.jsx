import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import actions from "../../redux/actions";
// function test(changeIndexDecrement, changeIndexIncrement) {
//   document.addEventListener("keydown", (event) => {
//     if (!event.ctrlKey && (event.code !== "KeyZ" || event.code !== "KeyY")) {
//       document.removeEventListener("keydown", event);
//       return;
//     }
//     console.log(event);
//     if (event.ctrlKey === true && event.code === "KeyZ") {
//       changeIndexDecrement(event);
//     }
//     if (event.ctrlKey === true && event.code === "KeyY") {
//       changeIndexIncrement(event);
//     }

//     return () => {
//       document.removeEventListener("keydown");
//     };
//   });
// }

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const defaultIndex = state.length - 1;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  useEffect(() => {
    setCurrentIndex(defaultIndex);
  }, [state]);

  //configure boards
  let boards = useSelector((state) => state[currentIndex]);

  const [newItemToProcess, setNewItemToProcess] = useState("");
  const [newItemToDone, setNewItemToDone] = useState("");
  const [editorView, setEditorView] = useState(false);
  const [editItem, setEditItem] = useState({
    content: "",
    currentBoard: "",
    id: "",
  });

  //MOVE (Drag&Drop)
  const onDragEnd = (result, boards) => {
    dispatch(actions.moveTask(result, boards));
  };

  // useKey("Conrol", changeIndex);

  //UNDO REDO State

  function changeIndex(event) {}

  function changeIndexDecrement(event) {
    if (currentIndex !== 0) {
      const newIndex = currentIndex - 1;
      if (Object.keys(state[newIndex]).length === 0) {
        return;
      }
      setCurrentIndex(newIndex);
    } else {
      return;
    }
  }

  function changeIndexIncrement(event) {
    if (currentIndex !== state.length - 1) {
      const newIndex = currentIndex + 1;
      if (newIndex > 10) {
        return;
      }
      setCurrentIndex(newIndex);
    } else {
      return;
    }
  }

  //Add task:
  //================
  const handleAddChange = (event) => {
    const { value, name } = event.target;
    if (name === "In process") {
      setNewItemToProcess(value);
    }
    if (name === "Done") {
      setNewItemToDone(value);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    let newItem;
    let currentBoardName;
    const { name } = event.target;

    if (name === "In process") {
      if (newItemToProcess === "") {
        alert("Empty filed");
        return;
      }
      newItem = {
        id: nanoid(),
        content: newItemToProcess,
      };
      currentBoardName = "In process";
      AddTask(boards, newItem, currentBoardName);
      setNewItemToProcess("");
    }

    if (name === "Done") {
      if (newItemToDone === "") {
        alert("Empty filed");
        return;
      }
      newItem = {
        id: nanoid(),
        content: newItemToDone,
      };
      currentBoardName = "Done";
      AddTask(boards, newItem, currentBoardName);
      setNewItemToDone("");
    }

    function AddTask(boards, task, currentBoardName) {
      dispatch(actions.addTask(boards, task, currentBoardName));
    }
  };
  //================

  //Delete task:
  //================
  const handleDeleteSubmit = (event, board, item) => {
    event.preventDefault();
    const currentTaskId = item.id;
    const currentBoardName = board.name;
    dispatch(actions.deleteTask(currentTaskId, currentBoardName));
  };
  //================

  //Edit task:
  //================
  const handleEditSet = (event, board, item) => {
    setEditorView(true);
    setEditItem({
      content: item.content,
      currentBoard: board,
      id: item.id,
    });
  };

  const handleEditChange = (event) => {
    const { value } = event.target;

    setEditItem({ ...editItem, content: value });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const taskContent = editItem.content;
    const taskId = editItem.id;
    const currentBoard = editItem.currentBoard;

    if (taskContent.trim() === "") {
      alert("Field is empty");
      return;
    } else {
      dispatch(actions.editTask(taskContent, taskId, currentBoard));
    }

    setEditorView(false);
  };
  //================

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" name="undo" onClick={changeIndexDecrement}>
        UNDO
      </button>
      <button type="submit" name="redo" onClick={changeIndexIncrement}>
        REDO
      </button>
      <form
        type="submit"
        onSubmit={handleEditSubmit}
        style={{ display: editorView ? "block" : "none" }}
      >
        <input
          type="text"
          value={editItem.content}
          name="editor"
          onChange={handleEditChange}
        />
        <button type="submit">Edit!</button>
      </form>

      <DragDropContext onDragEnd={(result) => onDragEnd(result, boards)}>
        {boards &&
          boards.length !== 0 &&
          Object.entries(boards).map(([id, board]) => {
            return (
              <div
                style={{
                  textAlign: "center",
                  marginRight: 40,
                }}
                key={id}
              >
                <h2>{board.name}</h2>

                <form
                  type="submit"
                  name={board.name}
                  onSubmit={handleAddSubmit}
                >
                  <input
                    type="text"
                    name={board.name}
                    value={
                      board.name === "In process"
                        ? newItemToProcess
                        : board.name === "Done"
                        ? newItemToDone
                        : ""
                    }
                    onChange={handleAddChange}
                  />
                  <button type="submit">Add!</button>
                </form>

                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {board.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",

                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",

                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <p>{item.content}</p>
                                    <button
                                      onClick={(event) =>
                                        handleDeleteSubmit(event, board, item)
                                      }
                                    >
                                      Delete
                                    </button>
                                    <button
                                      onClick={(event) =>
                                        handleEditSet(event, board, item)
                                      }
                                    >
                                      Edit
                                    </button>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
      </DragDropContext>
    </div>
  );
}

export default App;
