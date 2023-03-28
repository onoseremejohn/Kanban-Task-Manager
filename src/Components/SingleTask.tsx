import styled from "styled-components";
import { TasksType as BaseTasksType, Id } from "../types";
import { useGlobalContext } from "../AppContext";
import { countCompletedSubtasks } from "../helpers";

interface TasksType extends BaseTasksType {
  columnId: Id;
}

const SingleTask = ({
  id: taskId,
  title,
  subtasks,
  columnId = 0,
}: TasksType) => {
  const { openTask = () => {} } = useGlobalContext() || {};
  return (
    <Wrapper
      role="button"
      aria-label="view task"
      onClick={(e) => {
        openTask(columnId, taskId);
        e.stopPropagation();
      }}
    >
      <h4>{title}</h4>
      <p className="font-bold">
        {countCompletedSubtasks(subtasks)} of {subtasks.length} Subtasks
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  box-shadow: var(--bs);
  padding: 1.5rem 1rem;
  width: 17rem;
  font-size: 1rem;
  border-radius: var(--radius);
  border: 1px solid #8686861a;
  background-color: ${({ theme }) => theme.white};
  cursor: grab;
  &:hover {
    opacity: 50%;
  }
  h4 {
    font-size: 1rem;
    font-weight: var(--fw-bold);
    display: -webkit-box;
    display: -moz-box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-line-clamp: 4;
    -moz-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    color: var(--grey);
  }
`;

export default SingleTask;
