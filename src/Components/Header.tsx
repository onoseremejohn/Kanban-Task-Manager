import styled from "styled-components";
import {
  AddTaskMobile,
  ChevronDown,
  LogoMobile,
  LogoDark,
  LogoLight,
  MenuIcon,
} from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";

const Header = () => {
  const {
    currentBoardId,
    boards,
    showBoardMenu,
    editDeleteMenu,
    theme,
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
        <div className="left">
          {theme === "dark" ? <LogoLight /> : <LogoDark />}
        </div>
        <div className="mobile">
          <div>
            <span className="mobile-logo">
              <LogoMobile />
            </span>
            <button
              type="button"
              style={{ textTransform: "capitalize" }}
              className="board font-bold"
              onClick={(e) => {
                openBoardMenu();
                e.stopPropagation();
              }}
            >
              {currentBoard && currentBoard.length > 30
                ? `${currentBoard.substring(0, 30)}...`
                : currentBoard || "No board Found"}
              {"  "}
              <span className={showBoardMenu ? "dropdown rotate" : "dropdown"}>
                <ChevronDown />
              </span>
            </button>
            <h1 className="board font-bold">
              {currentBoard || "No board Found"}
            </h1>
          </div>
          {boards && boards.length > 0 && (
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
                <span className="text">Add New Task</span>
              </button>

              <button
                type="button"
                className="threedots"
                onClick={(e) => {
                  editDeleteToggle();
                  e.stopPropagation();
                }}
              >
                <MenuIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: 5rem;
  position: fixed;
  z-index: 15;
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.borderLine};
  .left {
    display: none;
  }
  .center {
    width: 90vw;
    margin: 0 auto;
  }
  .mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      gap: 2em;
    }
  }
  .plus {
    display: grid;
    place-items: center;
    background-color: #635fc7;
    padding: 0.6em;
    width: 3em;
    border-radius: 20px;
    transition: var(--transition);
    &:hover {
      background-color: #a8a4ff;
    }
    .text {
      display: none;
    }
  }
  .threedots {
    padding: 0.4em;
    transition: var(--transition);
    &:hover {
      background-color: ${({ theme }) => theme.body};
    }
  }
  .board {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    color: ${({ theme }) => theme.text};
  }
  button.board {
    text-align: left;
  }
  h1.board {
    display: none;
  }
  svg {
    font-size: 1.2rem;
    cursor: pointer;
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
      &:hover {
        opacity: 0.8;
      }
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
  @media screen and (min-width: 768px) {
    align-items: stretch;
    .left {
      display: flex;
      align-items: center;
      border-right: 1px solid ${({ theme }) => theme.borderLine};
    }
    .center {
      width: 100%;
      padding: 0 2em;
      display: grid;
      grid-template-columns: calc(300px - 2em) 1fr;
    }
    .mobile {
      padding-left: 2em;
      .mobile-logo {
        display: none;
      }
    }
    span.dropdown {
      display: none;
    }
    .plus {
      width: 12em;
      display: flex;
      gap: 1em;
      padding: 1em;
      justify-content: center;
      .text {
        display: block;
        color: #fff;
        font-weight: 600;
        font-size: 0.9rem;
      }
    }
    button.board {
      display: none;
    }
    h1.board {
      display: block;
      margin: 0;
      display: -webkit-box;
      display: -moz-box;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      -webkit-line-clamp: 2;
      -moz-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export default Header;
