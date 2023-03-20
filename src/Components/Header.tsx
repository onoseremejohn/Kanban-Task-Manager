import styled from "styled-components";
import logo from "../assets/logo-mobile.svg";
import { FiPlus } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";
import { useState } from "react";

const Header = () => {
  const {
    currentBoardId,
    boards,
    openBoardMenu = () => {},
    modify = () => {},
  } = useGlobalContext() || {};
  const currentBoard = findBoard(boards, currentBoardId);
  const [show, setShow] = useState(false);
  const toggleShow = setShow((s) => !s);
  return (
    <Wrapper>
      {show && (
        <div className="show">
          <button type="button">Edit Board</button>
          <button type="button">Delete Board</button>
        </div>
      )}
      <div className="center">
        <div className="gap">
          <img src={logo} alt="LOGO" />
          <button
            type="button"
            className="board font-bold"
            onClick={(e) => {
              openBoardMenu();
              e.stopPropagation();
            }}
          >
            {currentBoard}
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
            <FiPlus style={{ color: "white" }} />
          </button>
          <button
            type="button"
            style={{ padding: "0.4em" }}
            onClick={toggleShow}
          >
            <BsThreeDotsVertical />
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
    padding: 0.4em;
    aspect-ratio: 2.5/1;
    border-radius: 10px;
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
      width: 100%;
      display: block;
      padding: 0.5em 2em;
    }
  }
`;

export default Header;
