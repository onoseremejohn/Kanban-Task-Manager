import styled from "styled-components";
import BoardNames from "./BoardNames";
import ModeToggler from "./ModeToggler";
const Sidebar = () => {
  return (
    <Wrapper>
      <BoardNames />
      <ModeToggler />
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
  position: fixed;
  left: 0;
  top: 5rem;
  height: calc(100vh - 5rem);
  width: 32vw;
  background-color: ${({ theme }) => theme.white};
  border-right: 1px solid ${({ theme }) => theme.borderLine};
  padding: 2rem 5vw;
  button {
    color: inherit;
    font-size: 1.1rem;
    margin: 0;
    padding: 0.5em 0;
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
    display: flex;
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
      left: -5vw;
      width: calc(100% + 5vw);
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

export default Sidebar;
