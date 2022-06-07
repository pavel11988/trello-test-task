import { createReducer, current } from "@reduxjs/toolkit";
import actions from "./actions";
import { nanoid } from "nanoid";

let initialState = {
  boards: [
    {
      [nanoid()]: {
        name: "In process",
        items: [],
      },
      [nanoid()]: {
        name: "Done",
        items: [],
      },
    },
  ],
  currentIndex: 0,
};

const tasksReducer = createReducer(initialState, {
  [actions.addTask]: (state, { payload }) => {
    //Переменные для удобства
    const payloadBoards = payload.boards;
    const payloadTask = payload.newTask;
    const payloadCurrentBoard = payload.currentBoardName;

    let newItemToBoards = {};
    newItemToBoards = JSON.parse(JSON.stringify(payloadBoards));

    Object.entries(newItemToBoards).map((board) => {
      if (board[1].name === payloadCurrentBoard) {
        board[1].items.push(payloadTask);
      }
      return board;
    });

    state.boards.push(newItemToBoards);
    state.currentIndex = state.boards.length - 1;

    return state;
  },
  [actions.deleteTask]: (state, { payload }) => {
    const payloadBoards = payload.boards;
    const payloadCurrentTaskId = payload.currentTaskId;
    const payloadCurrentBoard = payload.currentBoardName;

    let newItemToBoards = {};
    newItemToBoards = JSON.parse(JSON.stringify(payloadBoards));

    Object.entries(newItemToBoards).map((board) => {
      if (board[1].name === payloadCurrentBoard) {
        board[1].items = board[1].items.filter(
          (item) => item.id !== payloadCurrentTaskId
        );
      }
      return board;
    });

    state.boards.push(newItemToBoards);
    state.currentIndex = state.boards.length - 1;
    return state;
  },
  [actions.editTask]: (state, { payload }) => {
    const payloadBoards = payload.boards;
    const payloadCurrentTaskId = payload.editItem.id;
    const payloadCurrentTaskContent = payload.editItem.content;
    const payloadCurrentBoardName = payload.currentBoardName;

    let newItemToBoards = {};
    newItemToBoards = JSON.parse(JSON.stringify(payloadBoards));

    Object.entries(newItemToBoards).map((board) => {
      if (board[1].name === payloadCurrentBoardName) {
        board[1].items.map((item) => {
          if (item.id === payloadCurrentTaskId) {
            item.content = payloadCurrentTaskContent;
          }
          return board;
        });
      }
      return board;
    });

    state.boards.push(newItemToBoards);
    state.currentIndex = state.boards.length - 1;

    return state;
  },
  [actions.moveTask]: (state, { payload }) => {
    const { result, boards } = payload;
    const { source, destination } = result;
    if (!result.destination) return;

    if (source.droppableId !== destination.droppableId) {
      //Если переносим карточку с одной доски на другую
      // source.droppableId       ---  Доска с которой переносим
      // destination.droppableId  ---  Доска на которую переносим
      const sourceBoard = boards[source.droppableId]; //Записываем в переменную ту доску с которой переносим (для удобства)
      const destinationBoard = boards[destination.droppableId]; //Записываем в переменную ту доску в которую переносим (для удобства)
      const sourceItems = [...sourceBoard.items]; //Записываем в переменную карточки с доски с которой переносим (для удобства)
      const destinationItems = [...destinationBoard.items]; //Записываем в переменную карточки с доски в которую переносим (для удобства)
      const [removed] = sourceItems.splice(source.index, 1); // Объект карточки которую перенесли удаляеи с списка карточек текущей доски
      destinationItems.splice(destination.index, 0, removed); // Вставляем ту карточку, которую удалили с первой доски во вторую без замены

      let newItemToBoards = {};
      newItemToBoards = JSON.parse(JSON.stringify(payload.boards));

      Object.entries(newItemToBoards).map((board) => {
        if (board[1].name === sourceBoard.name) {
          board[1].items = sourceItems;
        }
        if (board[1].name === destinationBoard.name) {
          board[1].items = destinationItems;
        }
        return board;
      });
      state.boards.push(newItemToBoards);
      state.currentIndex = state.boards.length - 1;

      return state;
    } else {
      //Если переносим карточку с в пределах одной доски
      const currentMoveBoard = boards[source.droppableId]; // Объект текущей доски
      const copiedItems = [...currentMoveBoard.items]; // Копия массива объектов с текущей доски
      const [removed] = copiedItems.splice(source.index, 1); // записываем "удалённую" (поднятую) карточку
      copiedItems.splice(destination.index, 0, removed); // "удалённую" (поднятую) карточку вставляем в то место, куда укажем (по индексу)

      let newItemToBoards = {};
      newItemToBoards = JSON.parse(JSON.stringify(payload.boards));
      Object.entries(newItemToBoards).map((board) => {
        if (board[1].name === currentMoveBoard.name) {
          board[1].items = copiedItems;
        }
        return board;
      });
      state.boards.push(newItemToBoards);
      state.currentIndex = state.currentIndex + 1;

      return state;
    }
  },

  [actions.undo]: (state) => {
    const currentState = current(state);
    let newCurrentIndex;
    if (currentState.currentIndex > 0) {
      newCurrentIndex = currentState.currentIndex - 1;
    } else {
      newCurrentIndex = currentState.currentIndex;
    }
    state.currentIndex = newCurrentIndex;
    return state;
  },

  [actions.redo]: (state) => {
    const currentState = current(state);
    let newCurrentIndex;
    if (currentState.currentIndex < currentState.boards.length - 1) {
      newCurrentIndex = currentState.currentIndex + 1;
    } else {
      newCurrentIndex = currentState.currentIndex;
    }
    state.currentIndex = newCurrentIndex;
    return state;
  },
});

export default tasksReducer;
