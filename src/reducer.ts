import {
  ActionType,
  StateType,
  ReducerType,
  BoardType,
  ViewTaskPayload,
} from "./types";
import {
  LOAD,
  OPENBOARDMENU,
  CLOSEMODAL,
  SELECTBOARD,
  VIEWTASK,
} from "./actions";

const reducer: ReducerType<StateType, ActionType> = (
  state: StateType,
  action: ActionType
) => {
  switch (action.type) {
    case LOAD: {
      let boards: BoardType[] = [];
      if (Array.isArray(action.payload)) {
        boards = action.payload;
      }
      const boardIds = boards.map((x) => x.id);
      return {
        ...state,
        boards,
        boardIds,
        currentBoardId: boardIds[0],
      };
    }
    case OPENBOARDMENU: {
      return { ...state, showBoardMenu: true };
    }
    case CLOSEMODAL: {
      return { ...state, showBoardMenu: false, viewTask: false };
    }
    case SELECTBOARD: {
      let { currentBoardId } = state;
      const id = action.payload;
      if ((id || id === 0) && typeof id !== "object") {
        currentBoardId = id;
      }
      return { ...state, currentBoardId };
    }
    case VIEWTASK: {
      const { boards, currentBoardId } = state;
      const { columnId, taskId } = action.payload as ViewTaskPayload;
      const board = boards?.find((board) => board.id === currentBoardId);
      const statusIds = board?.columns.map((c) => c.id);
      const column = board?.columns.find((c) => c.id === columnId);
      const task = column?.tasks.find((t) => t.id === taskId);
      return { ...state, viewTask: true, selectedTask: { task, statusIds } };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
