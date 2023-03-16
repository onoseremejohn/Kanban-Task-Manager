import styled from "styled-components";
import { Close } from "../assets/Icons";
import { forwardRef, useState, useRef, MouseEvent, TouchEvent } from "react";
import { useGlobalContext } from "../AppContext";
import { statusName, countCompletedSubtasks } from "../helpers";
const ViewTask = forwardRef<HTMLDivElement>((props, ref) => {
  const showRef = useRef<HTMLDivElement>(null);
  const {
    closeModal = () => {},
    selectedTask,
    boards,
    currentBoardId,
    toggleSubtask = () => {},
    changeStatus = () => {},
  } = useGlobalContext() || {};
  if (!selectedTask?.task) return null;
  const { title, description, status, subtasks } = selectedTask.task;
  const { statusIds } = selectedTask;
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((s) => !s);
  const closeShow = (e: MouseEvent | TouchEvent) => {
    if (show && !showRef.current?.contains(e.target as Node)) setShow(false);
  };
  return (
    <Wrapper ref={ref} onClick={closeShow}>
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
      <h4>{title}</h4>
      <p>{description || "no description"}</p>
      <h6>
        Subtasts ({countCompletedSubtasks(subtasks)} of {subtasks.length})
      </h6>
      {subtasks.map((s) => {
        return (
          <label key={s.id}>
            <input
              type="checkbox"
              checked={s.isCompleted}
              onChange={(e) => toggleSubtask(e, s.id)}
            />
            {s.title}
          </label>
        );
      })}
      <h6>Current Status</h6>
      <button type="button" className="status" onClick={toggleShow}>
        {status}
      </button>
      {show && (
        <div className="dropdown" ref={showRef}>
          {statusIds?.map((id) => {
            return (
              <button
                type="button"
                key={id}
                onClick={(e) => {
                  setShow(false);
                  changeStatus(id);
                  e.stopPropagation();
                }}
              >
                {statusName(boards, currentBoardId, id)}
              </button>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
});

export const Wrapper = styled.div`
  background-color: white;
  position: absolute;
  left: 50%;
  top: 10vh;
  transform: translateX(-50%);
  min-height: 70vh;
  width: 85vw;
  padding: 2.5em 1.5em;
  border-radius: var(--radius);
  label {
    display: flex;
    align-items: center;
    background-color: #f4f7fd;
    border-radius: var(--radius);
    padding: 0.5em 1em;
    gap: 0.8em;
    margin-bottom: 0.5em;
  }
  p {
    margin-bottom: 1.5em;
  }
  h6 {
    margin-bottom: 0.5em;
  }
  .status {
    display: block;
    width: 100%;
    border: 2px solid rgba(130, 143, 163, 0.4);
    padding: 0.5em 1em;
    text-align: left;
    border-radius: var(--radius);
    margin-bottom: 1em;
    &:focus {
      border-color: #635fc7;
    }
  }
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
  .dropdown {
    display: flex;
    flex-direction: column;
    align-items: start;
    box-shadow: var(--bs);
    /* padding: 1em 0em; */
    button {
      width: 100%;
      text-align: start;
      padding: 0.5em 1em;
    }
  }
`;

export default ViewTask;
