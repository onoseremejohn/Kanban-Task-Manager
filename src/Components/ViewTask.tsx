import styled from "styled-components";
import { Close, MenuIcon, ChevronDown } from "../assets/Icons";
import { forwardRef, useState, useRef, MouseEvent, TouchEvent } from "react";
import { useGlobalContext } from "../AppContext";
import { statusName, countCompletedSubtasks } from "../helpers";
const ViewTask = forwardRef<HTMLDivElement>((props, ref) => {
  const showRef = useRef<HTMLDivElement>(null);
  const modifyRef = useRef<HTMLDivElement>(null);
  const {
    closeModal = () => {},
    selectedTask,
    boards,
    currentBoardId,
    toggleSubtask = () => {},
    changeStatus = () => {},
    modify = () => {},
  } = useGlobalContext() || {};
  if (!selectedTask?.task) return null;
  const { title, description, status, subtasks } = selectedTask.task;
  const { statusIds } = selectedTask;
  const [showStatuses, setShowStatuses] = useState(false);
  const [modifyTask, setmodifyTask] = useState(false);
  const toggleShow = () => setShowStatuses((s) => !s);
  const toggleModify = () => setmodifyTask((s) => !s);
  const closeShow = (e: MouseEvent | TouchEvent) => {
    if (showStatuses && !showRef.current?.contains(e.target as Node))
      setShowStatuses(false);
    if (modifyTask && !modifyRef.current?.contains(e.target as Node))
      setmodifyTask(false);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
          position: "relative",
        }}
      >
        <h4>{title}</h4>
        <button className="threedots" type="button" onClick={toggleModify}>
          <MenuIcon />
        </button>
        {modifyTask && (
          <div
            style={{ position: "absolute" }}
            className="modifyTask"
            ref={modifyRef}
          >
            <button
              type="button"
              onClick={(e) => {
                modify();
                e.stopPropagation();
              }}
            >
              Edit task
            </button>
            <button
              type="button"
              onClick={(e) => {
                modify("delete");
                e.stopPropagation();
              }}
              style={{ color: "#ea5555" }}
            >
              Delete task
            </button>
          </div>
        )}
      </div>
      <p className="description">{description || "no description"}</p>
      <h6>
        Subtasks ({countCompletedSubtasks(subtasks)} of {subtasks.length})
      </h6>
      {subtasks.map((s) => {
        return (
          <label key={s.id} className={s.isCompleted ? "completed" : ""}>
            <input
              type="checkbox"
              checked={s.isCompleted}
              onChange={(e) => toggleSubtask(e, s.id)}
            />
            <p>{s.title}</p>
          </label>
        );
      })}
      <h6>Current Status</h6>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          className={showStatuses ? "status show" : "status"}
          onClick={toggleShow}
        >
          {status}
          <ChevronDown />
        </button>
        {showStatuses && (
          <div className="dropdown" ref={showRef}>
            {statusIds?.map((id) => {
              return (
                <button
                  type="button"
                  key={id}
                  onClick={(e) => {
                    setShowStatuses(false);
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
      </div>
    </Wrapper>
  );
});

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.modalText};
  position: relative;
  height: auto;
  max-height: 80vh;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  overflow-x: hidden;
  .threedots {
    padding: 0.4em;
    transition: var(--transition);
    &:hover {
      background-color: ${({ theme }) => theme.body};
    }
  }
  label {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.headerText};
    border-radius: var(--radius);
    font-weight: 600;
    padding: 0.6em 1em;
    gap: 0.8em;
    margin-bottom: 0.5em;
    cursor: pointer;
    transition: color 0.1s linear, text-decoration 0.1s linear;
    &:hover {
      background-color: #635fc740;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
  }
  .description {
    font-size: 1rem;
    margin-bottom: 1.5em;
    color: var(--grey);
  }
  h4 {
    color: ${({ theme }) => theme.headerText};
    margin-bottom: 0;
  }
  h6 {
    font-size: 0.75rem;
    margin-bottom: 0.5em;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 2px solid rgba(130, 143, 163, 0.4);
    padding: 0.5em 1em;
    border-radius: var(--radius);
    margin-bottom: 1em;
    color: ${({ theme }) => theme.headerText};
    &:focus {
      border-color: #635fc7;
    }
    svg {
      transition: var(--transition);
    }
  }
  .status.show {
    svg {
      rotate: 180deg;
    }
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
  .dropdown {
    display: flex;
    flex-direction: column;
    align-items: start;
    box-shadow: var(--bs);
    position: absolute;
    top: calc(100% + 0.5em);
    width: 100%;
    background-color: ${({ theme }) => theme.modifyToggle};
    button {
      color: inherit;
      width: 100%;
      text-align: start;
      padding: 0.5em 1em;
      font-size: larger;
    }
    margin-bottom: 2em;
  }
  .modifyTask {
    top: 105%;
    right: 0;
    display: flex;
    flex-direction: column;
    box-shadow: var(--bs);
    background-color: ${({ theme }) => theme.modifyToggle};
    color: var(--grey);
    button {
      background-color: inherit;
      color: inherit;
      font-size: 1rem;
      text-align: left;
      padding: 0.5em 1em;
      border-radius: 50px;
      &:hover {
        opacity: 75%;
      }
    }
  }
  .completed {
    font-weight: 400;
    text-decoration: line-through;
    color: gray;
  }
`;

export default ViewTask;
