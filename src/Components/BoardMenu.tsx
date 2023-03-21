import styled from "styled-components";
import { forwardRef } from "react";
import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";
import { BoardIcon } from "../assets/Icons";
const BoardMenu = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    boards,
    boardIds,
    currentBoardId,
    selectBoard = () => {},
    closeModal = () => {},
    openAddNewOrEditBoard = () => {},
  } = useGlobalContext() || {};
  return (
    <Wrapper ref={ref}>
      <h4>ALL BOARDS ({boardIds?.length})</h4>
      <ul>
        {boardIds?.map((id) => {
          const name = findBoard(boards, id);
          return (
            <li
              key={id}
              onClick={(e) => {
                e.stopPropagation();
                selectBoard(id);
                closeModal();
              }}
              className={currentBoardId === id ? "active" : ""}
            >
              <BoardIcon />
              <button className="font-bold" type="button">
                {name}
              </button>
            </li>
          );
        })}
      </ul>
      <li
        onClick={(e) => {
          e.stopPropagation();
          openAddNewOrEditBoard("add");
        }}
        className="create"
      >
        <BoardIcon />
        <button type="button" className="font-bold">
          + Create new board
        </button>
      </li>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: var(--grey);
  border-radius: var(--radius);
  padding: 1.2em 2em;
  width: 80vw;
  button {
    color: inherit;
    font-size: 1.1rem;
    margin: 0;
    padding: 0.5em 0;
  }
  h4 {
    font-weight: var(--fw-medium);
    font-size: 1rem;
    margin: 0;
    margin-bottom: 0.5em;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  li {
    display: flex;
    align-items: center;
    gap: 1em;
    width: 100%;
  }
  .active {
    position: relative;
    color: white;
    &::before {
      content: "";
      position: absolute;
      background-color: var(--purple);
      z-index: -1;
      top: 0;
      left: -2em;
      width: calc(100% + 2em);
      height: 100%;
      border-radius: 0 20px 20px 0;
    }
  }
  .create {
    color: var(--purple);
  }
`;

export default BoardMenu;
