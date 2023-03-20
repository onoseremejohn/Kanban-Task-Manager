import styled from "styled-components";
import { forwardRef } from "react";
import { Close } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";

const Delete = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    closeModal = () => {},
    selectedTask,
    deleteTask = () => {},
  } = useGlobalContext() || {};
  const task = selectedTask?.task;
  return (
    <Wrapper ref={ref}>
      <button
        type="button"
        className="close"
        onClick={(e) => {
          closeModal();
          e.stopPropagation();
        }}
      >
        <Close />
      </button>
      <h4>Delete this {task ? "task" : "board"}?</h4>
      <p>
        Are you sure you want to delete the
        <span className="font-bold">
          '{task?.title || "platform launch"}'
        </span>{" "}
        {task ? "task" : "board"}? This action will remove all{" "}
        {task ? "subtasks" : "columns"} and cannot be reversed
      </p>
      <div className="btns">
        <button
          type="button"
          className="delete btn"
          onClick={() => {
            if (task) deleteTask(task.id);
            else {
            }
            closeModal();
          }}
        >
          Delete
        </button>
        <button type="button" className="cancel btn" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: white;
  position: absolute;
  left: 50%;
  top: 10vh;
  transform: translateX(-50%);
  min-height: 70vh;
  width: 85vw;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  .close {
    position: absolute;
    right: 3%;
    top: 1.5%;
    background: rgba(8, 8, 8, 0.1);
    padding: 0.4em;
    border-radius: var(--radius);
    display: grid;
    place-content: center;
  }
  .btns {
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5em;
  }
`;

export default Delete;
