import { createReducer, current } from "@reduxjs/toolkit";
import actions from "./actions";

import { nanoid } from "nanoid";

// в inital state добавим пустые объекты как историю для перемещения назад-вперёд.
// (почему забиваем пустыми объектам? - из-за того, что мы юзаем библиотеку для перемещения,
// в котрой при доавблении в стейт нового объекта происходит быстрый "флеш" предыдущего обхекта
// стейта. Если стейт заполнен( сразу или по мере его заполенения - у нас 10 объектов),
// тогда флеш пропадает.
// Это небольшой баг библиотеки с которым я столкнулся уже в конце работы...
// По мере добавления, удаления, измененения или предвижения элементов - в массив стейт
// будут добавляться новые объекты с обновлёнными досками, которые по индексу мы можем
// выбрать. Ограничим стейт (историю) 10-ю шагами, чтобы сильно не забивать состояние.
// Если нету отмены/возобновления последнего действия - это не нужно
let initialState = [
  // {},
  // {},
  // {},
  // {},
  // {},
  // {},
  // {},
  // {},
  // {},
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
];

const tasksReducer = createReducer(initialState, {
  [actions.addTask]: (state, { payload }) => {
    const currentState = current(state);

    let newStateItem = {};

    newStateItem = JSON.parse(JSON.stringify(payload.boards));

    Object.entries(newStateItem).map((board) => {
      if (board[1].name === payload.currentBoardName) {
        board[1].items.push(payload.newTask);
      }
      return board;
    });

    if (currentState.length >= 10) {
      state.push(newStateItem);
      state.shift();
    } else {
      state.push(newStateItem);
    }

    return state;
  },

  [actions.deleteTask]: (state, { payload }) => {
    const currentState = current(state);
    const { currentBoardName, currentTaskId } = payload;
    let newStateItem = {};
    newStateItem = JSON.parse(
      JSON.stringify(currentState[currentState.length - 1])
    );

    Object.entries(newStateItem).map((board) => {
      if (board[1].name === currentBoardName) {
        board[1].items = board[1].items.filter(
          (item) => item.id !== currentTaskId
        );
      }
      return board;
    });

    if (currentState.length >= 10) {
      state.push(newStateItem);
      state.shift();
    } else {
      state.push(newStateItem);
    }

    return state;
  },

  [actions.editTask]: (state, { payload }) => {
    const currentState = current(state);
    const { taskContent, taskId, currentBoard } = payload;
    let newStateItem = {};
    newStateItem = JSON.parse(
      JSON.stringify(currentState[currentState.length - 1])
    );
    Object.entries(newStateItem).map((board) => {
      if (board[1].name === currentBoard.name) {
        board[1].items.map((item) => {
          if (item.id === taskId) {
            item.content = taskContent;
          }
          return board;
        });
      }
      return board;
    });
    if (currentState.length >= 10) {
      state.push(newStateItem);
      state.shift();
    } else {
      state.push(newStateItem);
    }

    return state;
  },

  [actions.moveTask]: (state, { payload }) => {
    const currentState = current(state);
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

      let newStateItem = {};
      newStateItem = JSON.parse(
        JSON.stringify(currentState[currentState.length - 1])
      );

      Object.entries(newStateItem).map((board) => {
        if (board[1].name === sourceBoard.name) {
          board[1].items = sourceItems;
        }
        if (board[1].name === destinationBoard.name) {
          board[1].items = destinationItems;
        }
        return board;
      });

      if (currentState.length >= 10) {
        state.push(newStateItem);
        state.shift();
      } else {
        state.push(newStateItem);
      }
    } else {
      //Если переносим карточку с в пределах одной доски
      const currentMoveBoard = boards[source.droppableId]; // Объект текущей доски
      const copiedItems = [...currentMoveBoard.items]; // Копия массива объектов с текущей доски
      const [removed] = copiedItems.splice(source.index, 1); // записываем "удалённую" (поднятую) карточку
      copiedItems.splice(destination.index, 0, removed); // "удалённую" (поднятую) карточку вставляем в то место, куда укажем (по индексу)

      let newStateItem = {};
      newStateItem = JSON.parse(
        JSON.stringify(currentState[currentState.length - 1])
      );
      Object.entries(newStateItem).map((board) => {
        if (board[1].name === currentMoveBoard.name) {
          board[1].items = copiedItems;
        }
        return board;
      });

      if (currentState.length >= 10) {
        state.push(newStateItem);
        state.shift();
      } else {
        state.push(newStateItem);
      }
    }
    return state;
  },
});

export default tasksReducer;
