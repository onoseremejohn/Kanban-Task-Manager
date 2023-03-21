import styled from "styled-components";
import {
  ThreeDots,
  AddTaskMobile,
  ChevronDown,
  LogoMobile,
} from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";

const Header = () => {
  const {
    currentBoardId,
    boards,
    showBoardMenu,
    editDeleteMenu,
    editDeleteToggle = () => {},
    openBoardMenu = () => {},
    modify = () => {},
    openAddNewOrEditBoard = () => {},
  } = useGlobalContext() || {};
  const currentBoard = findBoard(boards, currentBoardId);
  return (
    <Wrapper>
      {editDeleteMenu && (
        <div className="show">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openAddNewOrEditBoard("edit");
            }}
            className="edit"
          >
            Edit Board
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              modify("delete");
            }}
            className="delete"
          >
            Delete Board
          </button>
        </div>
      )}
      <div className="center">
        <div className="gap">
          <LogoMobile />
          <button
            type="button"
            className="board font-bold"
            onClick={(e) => {
              openBoardMenu();
              e.stopPropagation();
            }}
          >
            {currentBoard || "No board Found"}
            {"  "}
            <span className={showBoardMenu ? "dropdown rotate" : "dropdown"}>
              <ChevronDown />
            </span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="plus"
            onClick={(e) => {
              modify();
              e.stopPropagation();
            }}
          >
            <AddTaskMobile />
          </button>
          <button
            type="button"
            style={{ padding: "0.4em" }}
            onClick={(e) => {
              editDeleteToggle();
              e.stopPropagation();
            }}
          >
            <ThreeDots />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  min-height: 5rem;
  position: fixed;
  z-index: 15;
  background-color: white;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  .center {
    width: 90vw;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      gap: 1em;
    }
    .gap {
      gap: 2em;
    }
  }
  .plus {
    display: grid;
    place-items: center;
    background-color: #635fc7;
    padding: 0.6em;
    aspect-ratio: 2.5/1;
    border-radius: 20px;
  }
  .board {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
  }
  svg {
    font-size: 1.2rem;
  }
  .show {
    position: absolute;
    right: 8vw;
    top: 4.5rem;
    border-radius: var(--radius);
    box-shadow: var(--bs);
    background-color: white;
    button {
      font-size: 1.1rem;
      width: 100%;
      display: block;
      text-align: left;
      padding: 0.5em 1em;
    }
    button.edit {
      color: #828fa3;
    }
    button.delete {
      color: #ea5555;
    }
  }
  .dropdown {
    margin-left: 0.2em;
  }
  .dropdown svg {
    transform-origin: right center;
    transition: var(--transition);
  }
  .dropdown.rotate svg {
    rotate: 180deg;
  }
`;

export default Header;
