import styled from "styled-components";
import { forwardRef } from "react";
import BoardNames from "./BoardNames";
import ModeToggler from "./ModeToggler";
const BoardMenu = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Wrapper ref={ref}>
      <BoardNames />
      <ModeToggler />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.white};
  color: var(--grey);
  border-radius: var(--radius);
  padding: 1.2em 2em;
  width: 80vw;
  max-width: 300px;
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
    margin-bottom: 0.5em;
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
    &:hover {
      color: white;
      &::before {
        content: "";
        position: absolute;
        background-color: #a8a4ff;
        z-index: -1;
        top: 0;
        left: -2em;
        width: calc(100% + 2em);
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
    border-radius: var(--radius);
    background-color: ${({ theme }) => theme.body};
    display: flex;
    gap: 2em;
    justify-content: center;
    padding: 0.5em 0;
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
`;

export default BoardMenu;
