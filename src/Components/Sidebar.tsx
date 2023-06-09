import styled from "styled-components";
import BoardNames from "./BoardNames";
import ModeToggler from "./ModeToggler";
import { HideSidebar } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
const Sidebar = () => {
  const { sidebar = () => {}, sidebarOpen } = useGlobalContext() || {};
  return (
    <Wrapper sidebarOpen={sidebarOpen} className="scrollbar-style">
      <div>
        <BoardNames />
      </div>
      <div>
        <ModeToggler />
        <button
          type="button"
          className="hide-sidebar font-bold"
          onClick={() => sidebar("close")}
        >
          <HideSidebar /> Hide Sidebar
        </button>
      </div>
    </Wrapper>
  );
};

interface WrapperProps {
  sidebarOpen?: boolean;
}

const Wrapper = styled.aside<WrapperProps>`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
  }
  position: fixed;
  z-index: 4;
  left: 0;
  top: 5rem;
  height: calc(100% - 5rem);
  width: 300px;
  transform: ${({ sidebarOpen }) =>
    sidebarOpen ? "translateX(0)" : "translateX(-300px) translateX(-2em)"};
  background-color: ${({ theme }) => theme.white};
  border-right: 1px solid ${({ theme }) => theme.borderLine};
  padding: 2em 0;
  transition: transform 0.3s ease-in-out;
  overflow-x: hidden;
  flex-direction: column;
  justify-content: space-between;
  button:not(.social) {
    color: inherit;
    font-size: 1.1rem;
    padding: 0.5em 0;
    text-align: left;
  }
  h4 {
    font-weight: var(--fw-medium);
    font-size: 1rem;
    margin: 0;
    margin-bottom: 1em;
    color: var(--grey);
    padding-left: 2em;
  }
  ul.boardlist {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5em;
    margin-bottom: 0.5em;
  }
  ul.boardlist li,
  li.create {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1em;
    width: 100%;
    padding-left: 2em;
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
      width: calc(100% + 1em);
      height: 100%;
      border-radius: 0 20px 20px 0;
    }
  }
  ul.boardlist li:not(.active) {
    position: relative;
    color: var(--grey);
    &:hover {
      color: white;
      &::before {
        content: "";
        position: absolute;
        background-color: #a8a4ff;
        z-index: -1;
        top: 0;
        left: -5vw;
        width: calc(100% + 4vw);
        height: 100%;
        border-radius: 0 20px 20px 0;
      }
    }
  }
  .create {
    color: var(--purple);
    margin-bottom: 0.5em;
    transition: var(--transition);
    &:hover {
      opacity: 70%;
    }
  }
  .icons {
    margin: 0 auto;
    border-radius: var(--radius);
    background-color: ${({ theme }) => theme.body};
    display: flex;
    gap: 2em;
    justify-content: center;
    padding: 1em 0;
    width: calc(100% - 4em);
    margin-bottom: 0.5em;
  }
  .switch {
    position: relative;
    width: 40px;
    height: 20px;
    border: none;
    outline: none;
    cursor: pointer;
    span {
      position: absolute;
      inset: 0;
      border-radius: 20px;
      &::before {
        position: absolute;
        content: "";
        width: 35%;
        aspect-ratio: 1/1;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--clr-white);
        transition: var(--transition);
        border-radius: 50%;
      }
    }
    input {
      display: none;
      &:checked + span::before {
        left: 21px;
      }
    }
  }
  .hide-sidebar {
    padding-left: 2em !important;
    color: var(--grey) !important;
    transition: var(--transition);
    &:hover {
      opacity: 0.5;
    }
  }
`;

export default Sidebar;
