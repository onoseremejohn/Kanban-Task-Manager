import styled from "styled-components";
import BoardNames from "./BoardNames";
import ModeToggler from "./ModeToggler";
import { HideSidebar } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
const Sidebar = () => {
  const { sidebar = () => {}, sidebarOpen } = useGlobalContext() || {};
  return (
    <Wrapper sidebarOpen={sidebarOpen}>
      <BoardNames />
      <ModeToggler />
      <button
        type="button"
        className="hide-sidebar font-bold"
        onClick={() => sidebar("close")}
      >
        <HideSidebar /> Hide Sidebar
      </button>
    </Wrapper>
  );
};

interface WrapperProps {
  sidebarOpen?: boolean;
}

const Wrapper = styled.aside<WrapperProps>`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
  position: fixed;
  z-index: 4;
  left: 0;
  top: 5rem;
  height: calc(100vh - 5rem);
  width: 300px;
  transform: ${({ sidebarOpen }) =>
    sidebarOpen ? "translateX(0)" : "translateX(-300px) translateX(-2em)"};
  background-color: ${({ theme }) => theme.white};
  border-right: 1px solid ${({ theme }) => theme.borderLine};
  padding: 2em;
  transition: transform 0.3s ease-in-out;
  button {
    color: inherit;
    font-size: 1.1rem;
    margin: 0;
    padding: 0.5em 0;
    text-align: left;
  }
  h4 {
    font-weight: var(--fw-medium);
    font-size: 1rem;
    margin: 0;
    margin-bottom: 1.5em;
    color: var(--grey);
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5em;
    margin-bottom: 0.5em;
  }
  li {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1em;
    width: 100%;
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
      width: calc(100% + 2em);
      height: 100%;
      border-radius: 0 20px 20px 0;
    }
  }
  ul li:not(.active) {
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
        width: calc(100% + 5vw);
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
    position: absolute;
    bottom: 12%;
    border-radius: var(--radius);
    background-color: ${({ theme }) => theme.body};
    display: flex;
    gap: 2em;
    justify-content: center;
    padding: 1em 0;
    width: calc(100% - 4em);
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
      background-color: var(--purple);
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
    position: absolute;
    bottom: 5%;
    width: auto;
    color: var(--grey);
    text-align: left;
    transition: var(--transition);
    &:hover {
      opacity: 0.5;
    }
  }
`;

export default Sidebar;
