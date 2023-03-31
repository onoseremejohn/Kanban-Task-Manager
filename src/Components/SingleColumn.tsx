import styled from "styled-components";
import SingleTask from "./SingleTask";
import { ColumnType as BaseColumnType, TasksType } from "../types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { memo } from "react";

interface ColumnType extends BaseColumnType {
  index: number;
}

interface TaskListProps {
  isDraggingOver: boolean;
  empty: boolean;
}

interface InnerListProps {
  tasks: TasksType[];
  id: string;
}

const TaskList = styled.div<TaskListProps>`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  min-height: calc(100vh - 12rem);
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "var(--grey)" : "none"};
  transition: background-color 0.3s ease-in-out;
  border-radius: var(--radius);
  border: ${({ empty }) =>
    empty ? "2px dashed rgba(130, 143, 163, 0.4)" : ""};
`;

const InnerList = memo(({ tasks, id }: InnerListProps) => {
  return (
    <>
      {tasks.map((t, index) => (
        <SingleTask key={t.id} {...t} columnId={id} index={index} />
      ))}
    </>
  );
});

const SingleColumn = ({ name, tasks, id, index, color }: ColumnType) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          index={index}
          {...provided.draggableProps}
          ref={provided.innerRef}
          color={color}
          isDragging={snapshot.isDragging}
        >
          <div
            className="title"
            {...provided.dragHandleProps}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="color"></span>
            <div>
              <span className="name">{name}</span> ({tasks.length})
            </div>
          </div>
          <Droppable droppableId={id} type="TASK">
            {(provided, snapshot) => (
              <TaskList
                empty={tasks.length === 0}
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} id={id} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
};
interface WrapperProps {
  index: number;
  color: string;
  isDragging: boolean;
}
const Wrapper = styled.section<WrapperProps>`
  width: 17rem;
  outline: ${({ isDragging }) => (isDragging ? "1px solid #ea5555" : "")};
  .title {
    text-transform: uppercase;
    padding: 1em 0;
    font-weight: var(--fw-medium);
    color: var(--grey);
    letter-spacing: 2.5px;
    display: grid;
    grid-template-columns: 1em 1fr;
    gap: 0.8em;
    align-items: center;
    cursor: ew-resize;
    > div {
      display: flex;
      width: calc(17rem - 1.8em);
    }
  }
  .color {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: ${({ color }) => color};
  }
  span.name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default SingleColumn;
