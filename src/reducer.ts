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
  SameColumnReorderPayload,
  ColumnType,
  DiffColumnReorderPayload,
  reOrderColumnsPayload,
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
  TOGGLETHEME,
  SIDEBAR,
  SAMECOLUMNREORDER,
  DIFFCOLUMNREORDER,
  REORDERCOLUMNS,
} from "./actions";
import { statusName, getColumn } from "./helpers";
import { nanoid } from "nanoid";

const colors = [
  "#49c4e5",
  "#8471f2",
  "#67e2ae",
  "#e5a449",
  "#2a3fdb",
  "#c36e6e",
];

const reducer: ReducerType<StateType, ActionType> = (
  state: StateType,
  action: ActionType
) => {
  switch (action.type) {
    case LOAD: {
      let boards: BoardType[] = [];
      if (Array.isArray(action.payload)) {
        boards = action.payload;
        boards = boards.map((b) => {
          return {
            ...b,
            columns: b.columns.map((c, index) => {
              return { ...c, id: nanoid(), color: colors[index] };
            }),
          };
        });
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
      const id = action.payload as Id;
      if (id || id == 0 || id == "0") {
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
    case TOGGLETHEME: {
      let { theme } = state;
      theme = theme === "light" ? "dark" : "light";
      return { ...state, theme };
    }
    case SIDEBAR: {
      let val = action.payload as "open" | "close";
      if (val === "open") return { ...state, sidebarOpen: true };
      if (val === "close") return { ...state, sidebarOpen: false };
    }
    case SAMECOLUMNREORDER: {
      const { boards, currentBoardId } = state;
      const { taskId, columnId, destinationIndex } =
        action.payload as SameColumnReorderPayload;
      const column = getColumn(boards, currentBoardId, columnId);
      if (!column) return state;
      let tasks = [...column.tasks];
      const movedTask = column.tasks.find((t) => t.id.toString() === taskId);
      if (!movedTask) return state;
      tasks = tasks.filter((t) => t.id.toString() !== taskId);
      tasks.splice(destinationIndex, 0, movedTask);
      let newColumn: ColumnType;
      newColumn = { ...column, tasks: [...tasks] };
      let newBoards = [...boards];
      newBoards = newBoards.map((b) => {
        if (b.id === currentBoardId)
          return {
            ...b,
            columns: b.columns.map((c) => {
              if (c.id.toString() === columnId) return newColumn;
              return c;
            }),
          };
        return b;
      });
      return { ...state, boards: newBoards };
    }

    case DIFFCOLUMNREORDER: {
      const { boards, currentBoardId } = state;
      const { taskId, sourceColId, destColId, destinationIndex } =
        action.payload as DiffColumnReorderPayload;
      const oldColumn = getColumn(boards, currentBoardId, sourceColId);
      const newColumn = getColumn(boards, currentBoardId, destColId);
      if (!oldColumn || !newColumn) return state;
      let filteredOldColumn: ColumnType = {
        ...oldColumn,
        tasks: oldColumn.tasks.filter((t) => t.id.toString() !== taskId),
      };
      let tasks = [...newColumn.tasks];
      let movedTask = oldColumn.tasks.find((t) => t.id.toString() === taskId);
      const newStatusName = statusName(boards, currentBoardId, destColId);
      if (!movedTask || !newStatusName) return state;
      movedTask = { ...movedTask, status: newStatusName, statusId: destColId };
      tasks.splice(destinationIndex, 0, movedTask);
      let newUpdatedColumn: ColumnType = { ...newColumn, tasks: [...tasks] };
      let newBoards = [...boards];

      newBoards = newBoards.map((b) => {
        if (b.id === currentBoardId)
          return {
            ...b,
            columns: b.columns.map((c) => {
              if (c.id === sourceColId) return filteredOldColumn;
              if (c.id === destColId) return newUpdatedColumn;
              return c;
            }),
          };
        return b;
      });
      return { ...state, boards: newBoards };
    }
    case REORDERCOLUMNS: {
      const { boards, currentBoardId } = state;
      const { colId, destinationIndex } =
        action.payload as reOrderColumnsPayload;
      const columns = boards.find((b) => b.id === currentBoardId)?.columns;
      const movedColumn = getColumn(boards, currentBoardId, colId);
      if (!columns || !movedColumn) return state;
      const newColumns: ColumnType[] = columns.filter((c) => c.id !== colId);
      newColumns.splice(destinationIndex, 0, movedColumn);
      let newBoards = [...boards];
      newBoards = newBoards.map((b) => {
        if (b.id === currentBoardId) return { ...b, columns: newColumns };
        return b;
      });
      return { ...state, boards: newBoards };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
