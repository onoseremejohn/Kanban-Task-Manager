import styled from "styled-components";
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
  min-height: 2.5rem;
  font-size: 1rem;
  border-radius: var(--radius);
  background-color: ${({ theme }) => theme.white};
  cursor: grab;
  &:hover {
    opacity: 50%;
  }
  h4 {
    font-size: 1rem;
    font-weight: var(--fw-bold);
  }
  p {
    color: var(--grey);
  }
`;

export default SingleTask;
