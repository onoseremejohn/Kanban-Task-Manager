import styled from "styled-components";
import { forwardRef } from "react";
import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";
const BoardMenu = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    boards,
    boardIds,
    selectBoard = () => {},
    closeModal = () => {},
    openAddNewOrEditBoard = () => {},
  } = useGlobalContext() || {};
  return (
    <Wrapper ref={ref}>
      <h4>ALL BOARDS ({boardIds?.length})</h4>
      {boardIds?.map((id) => {
        const name = findBoard(boards, id);
        return (
          <button
            key={id}
            onClick={(e) => {
              e.stopPropagation();
              selectBoard(id);
              closeModal();
            }}
            className="font-bold"
          >
            {name}
          </button>
        );
      })}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          openAddNewOrEditBoard("add");
        }}
      >
        Create new board
      </button>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 1;
  padding: 1em;
  width: 65vw;
  button {
    font-size: 1rem;
    margin: 0;
    padding: 0.5em 0;
  }
`;

export default BoardMenu;
