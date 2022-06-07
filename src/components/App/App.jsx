import { nanoid } from "nanoid";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import actions from "../../redux/actions";

import Boards from "../Boards/Boards";
import TextEditor from "../TaskEditor/TaskEditor";

import { AppContainer } from "./App.styled";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const defaultIndex = state.tasks.currentIndex;
  let boards = state.tasks.boards[defaultIndex];

  //configure boards

  const [newItemToProcess, setNewItemToProcess] = useState("");
  const [newItemToDone, setNewItemToDone] = useState("");
  const [editorView, setEditorView] = useState(false);
  const [editItem, setEditItem] = useState({
    content: "",
    currentBoard: "",
    id: "",
  });

  useEffect(() => {
    setEditorView(false);
    setNewItemToProcess("");
    setNewItemToDone("");
  }, [state]);

  //MOVE (Drag&Drop)
  const onDragEnd = (result, boards) => {
    dispatch(actions.moveTask(boards, result));
  };

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
        toast.error("The input field is empty!");
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
        toast.error("The input field is empty!");
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
      toast.success("New task created!");
    }
  };
  //================

  //Delete task:
  //================
  const handleDeleteSubmit = (event, board, item) => {
    event.preventDefault();
    const currentTaskId = item.id;
    const currentBoardName = board.name;
    dispatch(actions.deleteTask(boards, currentTaskId, currentBoardName));
    toast.success("Task deleted!", {
      iconTheme: {
        primary: "#9c0202",
        secondary: "#FFFAEE",
      },
    });
  };
  //================

  //Edit task:
  //================
  const closeEditor = () => {
    setEditorView(false);
  };
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
    const currentBoardName = editItem.currentBoard.name;

    if (taskContent.trim() === "") {
      toast.error("The input field is empty!");
      return;
    } else {
      dispatch(actions.editTask(boards, editItem, currentBoardName));
      toast.success("Task changed!", {
        iconTheme: {
          primary: "#1d35a0",
          secondary: "#FFFAEE",
        },
      });
    }

    setEditorView(false);
  };
  //================

  return (
    <AppContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Boards
        boards={boards}
        handleAddSubmit={handleAddSubmit}
        newItemToProcess={newItemToProcess}
        newItemToDone={newItemToDone}
        handleAddChange={handleAddChange}
        handleDeleteSubmit={handleDeleteSubmit}
        handleEditSet={handleEditSet}
        onDragEnd={onDragEnd}
      />
      {editorView && (
        <TextEditor
          closeEditor={closeEditor}
          handleEditSubmit={handleEditSubmit}
          editorView={editorView}
          handleEditChange={handleEditChange}
          editItem={editItem}
        />
      )}

      <Toaster position="top-right" reverseOrder={true} />
    </AppContainer>
  );
}

export default App;
