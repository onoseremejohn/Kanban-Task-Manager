import styled from "styled-components";
import SingleTask from "./SingleITask";
import { ColumnType } from "../types";
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
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  min-height: calc(100vh - 5rem);
  .title {
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
  article {
    box-shadow: var(--bs);
    padding: 1.5rem 1rem;
    width: 17rem;
    min-height: 2.5rem;
    font-size: 1rem;
  }
`;

export default SingleColumn;
