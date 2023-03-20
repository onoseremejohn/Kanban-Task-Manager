import {
  ActionType,
  StateType,
  ReducerType,
  BoardType,
  ViewTaskPayload,
  ToggleSubtaskPayload,
  TasksType,
  Id,
  EditTaskPayload,
} from "./types";
import {
  LOAD,
  OPENBOARDMENU,
  CLOSEMODAL,
  SELECTBOARD,
  VIEWTASK,
  TOGGLESUBTASK,
  CHANGESTATUS,
  MODIFYTASK,
  EDITTASK,
  DELETETASK,
  FILTERDELETE,
} from "./actions";
// import { cloneDeep } from "lodash";
import { statusName } from "./helpers";

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
      return {
        ...state,
        showBoardMenu: false,
        viewTask: false,
        modifyTask: false,
        deleteWarning: false,
        selectedTask: { task: null, statusIds: [], columnId: 0 },
      };
    }
    case SELECTBOARD: {
      let { currentBoardId } = state;
      const id = action.payload;
      if ((id || id == 0) && typeof id !== "object") {
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
      return {
        ...state,
        viewTask: true,
        selectedTask: { task, statusIds, columnId },
      };
    }
    case TOGGLESUBTASK: {
      const { e, id } = action.payload as ToggleSubtaskPayload;
      const {
        boards,
        currentBoardId,
        selectedTask: { task, columnId },
      } = state;
      if (!task) return state;
      let newTask: TasksType;
      newTask = {
        ...task,
        subtasks: task.subtasks.map((s) => {
          if (s.id === id) return { ...s, isCompleted: e.target.checked };
          else return s;
        }),
      };
      let newBoards = [...boards];
      newBoards = newBoards.map((board) => {
        if (board.id === currentBoardId)
          return {
            ...board,
            columns: board.columns.map((c) => {
              if (c.id === columnId)
                return {
                  ...c,
                  tasks: c.tasks.map((t) => {
                    if (t.id === task.id) return newTask;
                    else return t;
                  }),
                };
              else return c;
            }),
          };
        else return board;
      });
      return {
        ...state,
        selectedTask: { ...state.selectedTask, task: newTask },
        boards: newBoards,
      };
    }
    case CHANGESTATUS: {
      const id = action.payload as Id;
      const {
        boards,
        currentBoardId,
        selectedTask: { task, columnId },
      } = state;
      const newStatus = statusName(boards, currentBoardId, id);
      if (!newStatus || !task || id === columnId) return state;
      let newTask: TasksType;
      newTask = { ...task, status: newStatus, statusId: id };
      let newBoards = [...boards];
      newBoards = newBoards.map((board) => {
        if (board.id === currentBoardId)
          return {
            ...board,
            columns: board.columns.map((c) => {
              if (c.id === columnId)
                return {
                  ...c,
                  tasks: c.tasks.filter((t) => t.id !== task.id),
                };
              else if (c.id === id)
                return { ...c, tasks: [...c.tasks, newTask] };
              else return c;
            }),
          };
        else return board;
      });
      return {
        ...state,
        selectedTask: { ...state.selectedTask, task: newTask, columnId: id },
        boards: newBoards,
      };
    }
    case MODIFYTASK: {
      return { ...state, modifyTask: true, viewTask: false };
    }
    case DELETETASK: {
      return {
        ...state,
        modifyTask: false,
        viewTask: false,
        deleteWarning: true,
      };
    }
    case EDITTASK: {
      const { task, val } = action.payload as EditTaskPayload;
      const {
        boards,
        currentBoardId,
        selectedTask: { columnId },
      } = state;
      let newBoards = [...boards];
      if (val) {
        newBoards = newBoards.map((b) => {
          if (b.id === currentBoardId)
            return {
              ...b,
              columns: b.columns.map((c) => {
                if (c.id !== task.statusId) {
                  if (c.id === columnId)
                    return {
                      ...c,
                      tasks: c.tasks.filter((t) => t.id !== task.id),
                    };
                  else return c;
                } else {
                  if (c.id === columnId)
                    return {
                      ...c,
                      tasks: c.tasks.map((t) => {
                        if (t.id === task.id) return task;
                        else return t;
                      }),
                    };
                  else return { ...c, tasks: [...c.tasks, task] };
                }
              }),
            };
          else return b;
        });
      } else {
        newBoards = newBoards.map((b) => {
          if (b.id === currentBoardId)
            return {
              ...b,
              columns: b.columns.map((c) => {
                if (c.id === task.statusId)
                  return { ...c, tasks: [...c.tasks, task] };
                else return c;
              }),
            };
          else return b;
        });
      }
      return { ...state, boards: newBoards };
    }
    case FILTERDELETE: {
      const id = action.payload as Id;
      const {
        boards,
        currentBoardId,
        selectedTask: { task, columnId },
      } = state;
      if (!task) return state;
      let newBoards = [...boards];
      newBoards = newBoards.map((b) => {
        if (b.id === currentBoardId)
          return {
            ...b,
            columns: b.columns.map((c) => {
              if (c.id === columnId)
                return {
                  ...c,
                  tasks: c.tasks.filter((t) => t.id !== id),
                };
              else return c;
            }),
          };
        else return b;
      });
      return { ...state, boards: newBoards };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
