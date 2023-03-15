import styled from "styled-components";
import logo from "../assets/logo-mobile.svg";

import { FiPlus } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobalContext } from "../AppContext";
import { findBoard } from "../helpers";

const Header = () => {
  const {
    openBoardMenu = () => {},
    currentBoardId,
    boards,
  } = useGlobalContext() || {};
  const currentBoard = findBoard(boards, currentBoardId);
  return (
    <Wrapper>
      <div className="center">
        <div className="gap">
          <img src={logo} alt="LOGO" />
          <button
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
          <button type="button" className="plus">
            <FiPlus style={{ color: "white" }} />
          </button>
          <button>
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
  /* border: 1px solid red; */
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
    padding: 0.5em;
    aspect-ratio: 2.5/1;
    border-radius: 10px;
  }
  .board {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
  }
`;

export default Header;
