import { type } from "os";
import { ChangeEvent } from "react";
export type Id = string | number;
export interface ViewTaskPayload {
  columnId: Id;
  taskId: Id;
}
export interface ToggleSubtaskPayload {
  e: ChangeEvent<HTMLInputElement>;
  id: Id;
}
export interface EditTaskPayload {
  task: TasksType;
  val: Boolean;
}

export interface ActionType {
  type: string;
  payload?: ViewTaskPayload | Id | ToggleSubtaskPayload | EditTaskPayload;
}

export interface StateType {
  theme: string;
  boards: BoardType[];
  boardIds: Id[];
  currentBoardId: Id;
  showBoardMenu: boolean;
  viewTask: boolean;
  modifyTask: boolean;
  editDeleteMenu: boolean;
  deleteWarning: boolean;
  addNewBoardModal: boolean;
  selectedTask: { task?: TasksType | null; statusIds?: Id[]; columnId: Id };
  openBoardMenu?(): void;
  closeModal?(): void;
  selectBoard?(a: Id): void;
  openTask?(a: Id, b: Id): void;
  toggleSubtask?(a: ChangeEvent<HTMLInputElement>, b: Id): void;
  changeStatus?(a: Id): void;
  modify?(a?: "delete"): void;
  editTask?(a: TasksType, b: Boolean): void;
  deleteTask?(a: Id): void;
  editDeleteToggle?(): void;
  deleteBoard?(a?: Id): void;
}

export type ReducerType<S, A> = (state: S, action: A) => StateType;

export interface TasksType {
  id: Id;
  title: string;
  description: string;
  status: string;
  statusId: Id;
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
