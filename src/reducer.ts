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
  VIEWTASKMODAL,
  TOGGLESUBTASK,
  CHANGESTATUS,
  MODIFYTASKMODAL,
  EDITTASK,
  DELETETASKORBOARDMODAL,
  FILTERDELETETASK,
  EDITDELETEMENUTOGGLE,
  FILTERDELETEBOARD,
  ADDNEWBOARD,
  OPENADDNEWBOARDMODAL,
  OPENEDITBOARDMODAL,
  EDITBOARD,
  ADDNEWCOLUMNMODAL,
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
      const boardIds = boards.map((b) => b.id);
      return {
        ...state,
        boards,
        boardIds,
        currentBoardId: boardIds[0],
      };
    }
    case OPENBOARDMENU: {
      return { ...state, showBoardMenu: true, editDeleteMenu: false };
    }
    case CLOSEMODAL: {
      return {
        ...state,
        showBoardMenu: false,
        viewTaskModal: false,
        modifyTask: false,
        deleteWarning: false,
        editOrAddNewBoardModal: false,
        editBoardFlag: false,
        addNewColumnFlag: false,
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
    case VIEWTASKMODAL: {
      const { boards, currentBoardId } = state;
      const { columnId, taskId } = action.payload as ViewTaskPayload;
      const board = boards?.find((board) => board.id === currentBoardId);
      const statusIds = board?.columns.map((c) => c.id);
      const column = board?.columns.find((c) => c.id === columnId);
      const task = column?.tasks?.find((t) => t.id === taskId);
      return {
        ...state,
        viewTaskModal: true,
        editDeleteMenu: false,
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
    case MODIFYTASKMODAL: {
      return {
        ...state,
        modifyTask: true,
        viewTaskModal: false,
        editDeleteMenu: false,
      };
    }
    case DELETETASKORBOARDMODAL: {
      return {
        ...state,
        modifyTask: false,
        viewTaskModal: false,
        editDeleteMenu: false,
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
    case FILTERDELETETASK: {
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
    case EDITDELETEMENUTOGGLE: {
      const { editDeleteMenu } = state;
      return { ...state, editDeleteMenu: !editDeleteMenu };
    }
    case FILTERDELETEBOARD: {
      const id = action.payload as Id;
      const { boards } = state;
      let newBoards = [...boards];
      newBoards = newBoards.filter((b) => b.id !== id);
      const boardIds = newBoards.map((b) => b.id);
      return {
        ...state,
        boards: newBoards,
        currentBoardId: newBoards[0]?.id,
        boardIds,
      };
    }
    case OPENADDNEWBOARDMODAL: {
      return {
        ...state,
        editDeleteMenu: false,
        showBoardMenu: false,
        editBoardFlag: false,
        addNewColumnFlag: false,
        editOrAddNewBoardModal: true,
      };
    }
    case ADDNEWBOARD: {
      const board = action.payload as BoardType;
      const { boards } = state;
      const newBoards = [...boards, board];
      const boardIds = newBoards.map((b) => b.id);
      return {
        ...state,
        boards: newBoards,
        currentBoardId: board.id,
        boardIds,
      };
    }
    case OPENEDITBOARDMODAL: {
      return {
        ...state,
        editOrAddNewBoardModal: true,
        editDeleteMenu: false,
        showBoardMenu: false,
        addNewColumnFlag: false,
        editBoardFlag: true,
      };
    }
    case EDITBOARD: {
      const board = action.payload as BoardType;
      const { boards } = state;
      let newBoards = [...boards];
      newBoards = newBoards.map((b) => {
        if (b.id === board.id) return board;
        else return b;
      });
      const boardIds = newBoards.map((b) => b.id);
      return {
        ...state,
        boards: newBoards,
        currentBoardId: board.id,
        boardIds,
      };
    }
    case ADDNEWCOLUMNMODAL: {
      return {
        ...state,
        editBoardFlag: false,
        editDeleteMenu: false,
        showBoardMenu: false,
        addNewColumnFlag: true,
        editOrAddNewBoardModal: true,
      };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
