import styled from "styled-components";
import SingleTask from "./SingleTask";
import { ColumnType as BaseColumnType } from "../types";
import { Droppable } from "@hello-pangea/dnd";
const colors = [
  "#49c4e5",
  "#8471f2",
  "#67e2ae",
  "#e5a449",
  "#2a3fdb",
  "#c36e6e",
];

interface ColumnType extends BaseColumnType {
  index: number;
}

interface TaskListProps {
  isDraggingOver: boolean;
}

const TaskList = styled.div<TaskListProps>`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  height: 100%;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "var(--grey)" : "none"};
  transition: var(--transition);
  border-radius: var(--radius);
`;

const SingleColumn = ({ name, tasks, id, index }: ColumnType) => {
  return (
    <Wrapper index={index}>
      <div className="title">
        <span className="color"></span>
        <div>
          <span className="name">{name}</span> ({tasks.length})
        </div>
      </div>
      <Droppable droppableId={id} type="TASK">
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, i) => (
              <SingleTask key={task.id} {...task} columnId={id} index={i} />
            ))}
            {tasks.length === 0 && <div className="empty"></div>}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Wrapper>
  );
};
interface WrapperProps {
  index: number;
}
const Wrapper = styled.section<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  min-height: calc(100vh - 8rem);
  width: 17rem;
  .title {
    text-transform: uppercase;
    font-weight: var(--fw-medium);
    color: var(--grey);
    letter-spacing: 2.5px;
    display: grid;
    grid-template-columns: 1em 1fr;
    gap: 0.8em;
    align-items: center;
    > div {
      display: flex;
      width: calc(17rem - 1.8em);
    }
  }
  .color {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: ${({ index }) => colors[index]};
  }
  span.name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .empty {
    min-height: 100%;
    width: 100%;
    border: 2px dashed rgba(130, 143, 163, 0.4);
    border-radius: var(--radius);
  }
`;

export default SingleColumn;
