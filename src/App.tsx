import { useGlobalContext } from "./AppContext";
import Header from "./Components/Header";
import Overlay from "./Components/Overlay";
import SingleColumn from "./Components/SingleColumn";
import styled from "styled-components";

export default () => {
  const {
    boards,
    currentBoardId,
    openAddNewOrEditBoard = () => {},
  } = useGlobalContext() || {};
  const data = boards?.find((board) => board.id === currentBoardId);

  return (
    <>
      <Header />
      <main>
        {data?.columns.map((x) => {
          return <SingleColumn key={x.id} {...x} />;
        })}
        {boards?.length === 0 && (
          <Wrapper>
            <p>This app is empty. Create a new board to get started</p>
            <button className="btn">Create New Board</button>
          </Wrapper>
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
      </main>
      <Overlay />
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  text-align: center;
`;

const NewColumn = styled.div`
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
