import { TasksType, BoardType, Id, ColumnType } from "./types";
export const countCompletedSubtasks = (subtasks: TasksType["subtasks"]) => {
  const completed = subtasks.filter((x) => x.isCompleted);
  return completed.length;
};

interface FindBoard {
  (a: BoardType[] | undefined, b: Id | undefined): string | undefined;
}
interface StatusName {
  (a: BoardType[] | undefined, b: Id | undefined, c: Id | undefined):
    | string
    | undefined;
}
interface GetColumn {
  (a: BoardType[], b: Id, c: Id): ColumnType | undefined;
}

export const findBoard: FindBoard = (boards, id) => {
  const board = boards?.find((b) => b.id === id);
  return board?.name;
};

export const statusName: StatusName = (boards, boardId, id) => {
  const board = boards?.find((b) => b.id === boardId);
  const col = board?.columns.find((c) => c.id === id);
  return col?.name;
};

export const getColumn: GetColumn = (boards, boardId, columnId) => {
  const board = boards.find((b) => b.id === boardId);
  const col = board?.columns.find(
    (c) => c.id.toString() === columnId.toString()
  );
  return col;
};
