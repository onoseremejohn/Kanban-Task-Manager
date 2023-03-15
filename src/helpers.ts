import { TasksType, BoardType } from "./types";
export const countCompletedSubtasks = (subtasks: TasksType["subtasks"]) => {
  const completed = subtasks.filter((x) => x.isCompleted);
  return completed.length;
};

interface Find {
  (a: BoardType[] | undefined, b: string | number | undefined):
    | string
    | undefined;
}

export const findBoard: Find = (boards, id) => {
  const board = boards?.find((b) => b.id === id);
  return board?.name;
};

// class Task