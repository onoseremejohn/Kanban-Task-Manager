import { forwardRef } from "react";
import styled from "styled-components";
import { Close } from "../assets/Icons";
const AddNewTask = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Wrapper ref={ref}>
      <button type="button" className="close">
        <Close />
      </button>
      <h4>Add New Task</h4>
      <form>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" />
        </div>
        <div className="form-control">
          <label htmlFor="subtasks">Subtasks</label>
          <input type="text" id="subtasks" />
        </div>
        <button type="button" className="subtask">
          Add New Subtask
        </button>
        <button type="button" className="status">
          Now
        </button>
        <button type="submit" className="submit">
          Create Task
        </button>
      </form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 10vh;
  transform: translateX(-50%);
  min-height: 70vh;
  width: 85vw;
  padding: 2.5em 1.5em;
  border-radius: var(--radius);
  .close {
    position: absolute;
    right: 15px;
    top: 15px;
    background: rgba(8, 8, 8, 0.1);
    padding: 0.4em;
    border-radius: var(--radius);
    display: grid;
    place-content: center;
  }
  .form-control {
    display: flex;
    flex-direction: column;
  }
`;

export default AddNewTask;
