import styled from "styled-components";
import BoardMenu from "../Components/BoardMenu";
import ViewTask from "./ViewTask";
import { useGlobalContext } from "../AppContext";
import { useEffect, useRef } from "react";
const Overlay = () => {
  const articleRef = useRef<HTMLDivElement>(null);
  const {
    viewTask,
    showBoardMenu,
    closeModal = () => {},
  } = useGlobalContext() || {};
  const show = showBoardMenu || viewTask;
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (show && !articleRef.current?.contains(event.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [show, articleRef, closeModal]);
  return (
    <Wrapper show={show}>
      {showBoardMenu && <BoardMenu ref={articleRef} />}
      {viewTask && <ViewTask ref={articleRef} />}
    </Wrapper>
  );
};

interface WrapperProps {
  show?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  inset: 0;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  z-index: ${({ show }) => (show ? "200" : "-100")};
  transition: var(--transition);
  background-color: ${({ show }) =>
    show ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
`;

export default Overlay;
