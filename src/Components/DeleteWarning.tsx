import styled from "styled-components";
import { forwardRef } from "react";
import { Close } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";
// delete warning for task and board
const DeleteWarning = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    closeModal = () => {},
    selectedTask,
    deleteTask = () => {},
    boards,
    currentBoardId,
    deleteBoard = () => {},
  } = useGlobalContext() || {};
  const task = selectedTask?.task;
  const boardName = findBoard(boards, currentBoardId);
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
        Are you sure you want to delete the{" "}
        <span className="font-bold">'{task?.title || boardName}'</span>{" "}
        {task ? "task" : "board"}? This action will remove all{" "}
        {task ? "subtasks" : "columns"} and cannot be reversed
      </p>
      <div className="btns">
        <button
          type="button"
          className="delete"
          onClick={() => {
            if (task) deleteTask(task.id);
            else deleteBoard(currentBoardId);
            closeModal();
          }}
        >
          Delete
        </button>
        <button type="button" className="cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  position: relative;
  height: auto;
  max-height: 90vh;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  h4 {
    color: #ea5555;
  }
  .close {
    position: absolute;
    right: 3%;
    top: 1.5%;
    padding: 0.4em;
    transition: var(--transition);
    border-radius: var(--radius);
    &:hover {
      background-color: ${({ theme }) => theme.body};
    }
  }
  p {
    color: var(--grey);
  }
  .btns {
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5em;
    button {
      border-radius: 20px;
      padding: 0.75em 0;
      font-weight: 600;
    }
  }
  .delete {
    background-color: #ea5555;
    color: white;
    &:hover {
      color: #ea5555;
      background-color: white;
      outline: 1px solid #ea5555;
    }
  }
  .cancel {
    background-color: #f0effa;
    color: var(--purple);
    &:hover {
      color: ${({ theme }) => theme.cancelColor};
      background-color: ${({ theme }) => theme.cancelBg};
      outline: 1px solid var(--purple);
    }
  }
`;

export default DeleteWarning;
