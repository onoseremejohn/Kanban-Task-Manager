import styled from "styled-components";
import { useGlobalContext } from "../AppContext";
import SingleColumn from "./SingleColumn";
const MainBoard = () => {
  const {
    boards,
    currentBoardId,
    sidebarOpen,
    openAddNewOrEditBoard = () => {},
  } = useGlobalContext() || {};
  const data = boards?.find((board) => board.id === currentBoardId);

  return (
    <Wrapper sidebarOpen={sidebarOpen}>
      <div className="move">
        {data?.columns.map((x) => {
          return <SingleColumn key={x.id} {...x} />;
        })}
        {boards?.length === 0 && (
          <Empty>
            <p>This app is empty. Create a new board to get started</p>
            <button className="btn">Create New Board</button>
          </Empty>
        )}
        {Array.isArray(boards) && boards.length > 0 && (
          <NewColumn>
            <div>&nbsp;</div>
            <div
              className="gradient"
              role="button"
              aria-label="Add new column"
              onClick={(e) => {
                e.stopPropagation();
                openAddNewOrEditBoard("column");
              }}
            >
              <p className="absolute-center font-bold">+ New Column</p>
            </div>
          </NewColumn>
        )}
      </div>
    </Wrapper>
  );
};

interface WrapperProps {
  sidebarOpen?: boolean;
}

const Wrapper = styled.main<WrapperProps>`
  margin-top: 5rem;
  overflow: scroll;
  height: calc(100vh - 5rem);
  transition: margin-left 0.3s ease-in-out;
  @media screen and (min-width: 768px) {
    margin-left: ${({ sidebarOpen }) =>
      sidebarOpen ? "calc(300px + 2em)" : "0"};
  }
  &::-webkit-scrollbar {
    height: 0.4rem;
    width: 0.7rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--grey);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--purple);
  }
  &::-webkit-scrollbar-corner {
    display: none;
  }
  .move {
    cursor: move;
    display: flex;
    gap: 2em;
    padding: 2em;
    width: 105%;
  }
`;

const Empty = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  text-align: center;
`;

const NewColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  height: calc(100vh - 8rem);
  min-width: 17rem;
  .gradient {
    min-height: 100%;
    position: relative;
    border-radius: var(--radius);
    background: linear-gradient(
      to bottom,
      rgba(121, 132, 147, 0.2),
      rgba(130, 143, 163, 0.1),
      rgba(130, 143, 163, 0)
    );
    cursor: pointer;
    &:hover {
      p {
        color: var(--purple);
      }
    }
  }
  p {
    font-size: 1.2rem;
    color: var(--grey);
  }
`;

export default MainBoard;
