import styled from "styled-components";
import BoardMenu from "../Components/BoardMenu";
import ViewTask from "./ViewTask";
import ModifyTask from "./ModifyTask";
import DeleteWarning from "./DeleteWarning";
import EditOrAddNewBoard from "./EditOrAddNewBoard";
import { useGlobalContext } from "../AppContext";
import { useEffect, useRef } from "react";
const Overlay = () => {
  const articleRef = useRef<HTMLDivElement>(null);
  const {
    viewTaskModal,
    showBoardMenu,
    modifyTask,
    deleteWarning,
    editDeleteMenu,
    editOrAddNewBoardModal,
    editDeleteToggle = () => {},
    closeModal = () => {},
  } = useGlobalContext() || {};
  const show =
    showBoardMenu ||
    viewTaskModal ||
    modifyTask ||
    deleteWarning ||
    editOrAddNewBoardModal;
  useEffect(() => {
    const handleClick = (event: Event) => {
      if (editDeleteMenu) editDeleteToggle();
      if (show && !articleRef.current?.contains(event.target as Node))
        closeModal();
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [show, articleRef, closeModal]);
  return (
    <Wrapper show={show}>
      {showBoardMenu && <BoardMenu ref={articleRef} />}
      {viewTaskModal && <ViewTask ref={articleRef} />}
      {modifyTask && <ModifyTask ref={articleRef} />}
      {deleteWarning && <DeleteWarning ref={articleRef} />}
      {editOrAddNewBoardModal && <EditOrAddNewBoard ref={articleRef} />}
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
  z-index: ${({ show }) => (show ? "200" : "")};
  transition: var(--transition);
  background-color: ${({ show }) =>
    show ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

export default Overlay;
