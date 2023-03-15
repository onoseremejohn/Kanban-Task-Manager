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
  } = useGlobalContext() || {};
  return (
    <Wrapper ref={ref}>
      <h4>ALL BOARDS ({boardIds?.length})</h4>
      {boardIds?.map((id) => {
        const name = findBoard(boards, id);
        return (
          <h5
            key={id}
            onClick={() => {
              closeModal();
              selectBoard(id);
            }}
          >
            {name}
          </h5>
        );
      })}
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
  gap: 0.5em;
  /* z-index: 105; */
  opacity: 1;
  padding: 1em;
  width: 65vw;
`;

export default BoardMenu;
