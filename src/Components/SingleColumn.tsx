import styled from "styled-components";
import SingleTask from "./SingleTask";
import { ColumnType } from "../types";
import { divide } from "lodash";
const SingleColumn = ({ name, tasks, id }: ColumnType) => {
  return (
    <Wrapper>
      <div className="title">
        <span className="color"></span>
        <span>
          {name} ({tasks.length})
        </span>
      </div>
      {tasks.map((task) => (
        <SingleTask key={task.id} {...task} columnId={id} />
      ))}
      {tasks.length === 0 && <div className="empty"></div>}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  min-height: calc(100vh - 8rem);
  min-width: 17rem;
  .title {
    text-transform: uppercase;
    font-weight: var(--fw-medium);
    color: var(--grey);
    letter-spacing: 2.5px;
    display: flex;
    gap: 0.8em;
    align-items: center;
  }
  .color {
    /* display: inline-block; */
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: red;
  }
  .empty {
    height: 100%;
    width: 100%;
    outline: 1px dashed rgba(130, 143, 163, 0.4);
    outline-width: 2px;
    border-radius: var(--radius);
  }
`;

export default SingleColumn;
