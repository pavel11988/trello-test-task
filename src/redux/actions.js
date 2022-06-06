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
  (currentTaskId, currentBoardName) => ({
    payload: {
      currentTaskId,
      currentBoardName,
    },
  })
);

const editTask = createAction(
  "tasks/editTask",
  (taskContent, taskId, currentBoard) => ({
    payload: {
      taskContent,
      taskId,
      currentBoard,
    },
  })
);

const moveTask = createAction("task/moveTask", (result, boards) => ({
  payload: {
    result,
    boards,
  },
}));

const actions = {
  addTask,
  deleteTask,
  editTask,
  moveTask,
};

export default actions;
