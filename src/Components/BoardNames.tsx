import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";
import { BoardIcon } from "../assets/Icons";

const BoardNames = () => {
  const {
    boards,
    boardIds,
    currentBoardId,
    selectBoard = () => {},
    closeModal = () => {},
    openAddNewOrEditBoard = () => {},
  } = useGlobalContext() || {};
  return (
    <>
      <h4>ALL BOARDS ({boardIds?.length})</h4>
      <ul className="boardlist">
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
              <button
                className="font-bold"
                type="button"
                style={{ textTransform: "capitalize" }}
              >
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
    </>
  );
};

export default BoardNames;
