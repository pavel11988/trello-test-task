import { createAction } from "@reduxjs/toolkit";

const addTask = createAction(
  "tasks/addTask",
  (boards, newTask, currentBoardName) => ({
    payload: {
      boards,
      newTask,
      currentBoardName,
    },
  })
);

const deleteTask = createAction(
  "tasks/deleteTask",
  (boards, currentTaskId, currentBoardName) => ({
    payload: {
      boards,
      currentTaskId,
      currentBoardName,
    },
  })
);

const editTask = createAction(
  "tasks/editTask",
  (boards, editItem, currentBoardName) => ({
    payload: {
      boards,
      editItem,
      currentBoardName,
    },
  })
);

const moveTask = createAction("task/moveTask", (boards, result) => ({
  payload: {
    boards,
    result,
  },
}));

const undo = createAction("task/undo", () => ({}));
const redo = createAction("task/redo", () => ({}));

const actions = {
  addTask,
  deleteTask,
  editTask,
  moveTask,
  undo,
  redo,
};

export default actions;
