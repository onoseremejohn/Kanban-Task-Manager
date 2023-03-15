import { type } from "os";
export type Id = string | number;
export interface ViewTaskPayload {
  columnId: Id;
  taskId: Id;
}
export interface ActionType {
  type: string;
  payload?: ViewTaskPayload | Id;
}

export interface StateType {
  theme: string;
  boards: BoardType[];
  boardIds: Id[];
  currentBoardId: Id;
  showBoardMenu: boolean;
  viewTask: boolean;
  selectedTask?: { task?: TasksType | null; statusIds?: Id[] };
  openBoardMenu?: () => void;
  closeModal?: () => void;
  selectBoard?: (a: Id) => void;
  openTask?: (a: Id, b: Id) => void;
  editTask?: () => void;
}

export type ReducerType<S, A> = (state: S, action: A) => StateType;

export interface TasksType {
  id: Id;
  title: string;
  description: string;
  status: string;
  statusId: number;
  subtasks: { title: string; isCompleted: boolean; id: Id }[];
  columnId?: Id;
}

export interface ColumnType {
  id: Id;
  name: string;
  tasks: TasksType[];
}

export interface BoardType {
  id: Id;
  name: string;
  columns: ColumnType[];
}
