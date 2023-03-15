import { TasksType } from "../types";
import { countCompletedSubtasks } from "../helpers";
const SingleTask = ({ id: taskId, title, subtasks, columnId }: TasksType) => {
  return (
    <article role="button" aria-label="edit task">
      <h4>{title}</h4>
      <p>
        {countCompletedSubtasks(subtasks)} of {subtasks.length} Subtasks
      </p>
    </article>
  );
};

export default SingleTask;
