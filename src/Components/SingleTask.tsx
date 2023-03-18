import { TasksType } from "../types";
import { useGlobalContext } from "../AppContext";
import { countCompletedSubtasks } from "../helpers";
const SingleTask = ({
  id: taskId,
  title,
  subtasks,
  columnId = 0,
}: TasksType) => {
  const { openTask = () => {} } = useGlobalContext() || {};
  return (
    <article
      role="button"
      aria-label="view task"
      onClick={(e) => {
        openTask(columnId, taskId);
        e.stopPropagation();
      }}
    >
      <h4>{title}</h4>
      <p>
        {countCompletedSubtasks(subtasks)} of {subtasks.length} Subtasks
      </p>
    </article>
  );
};

export default SingleTask;
