import { useGlobalContext } from "./AppContext";
import Header from "./Components/Header";
import Overlay from "./Components/Overlay";
import SingleColumn from "./Components/SingleColumn";
import styled from "styled-components";

export default () => {
  const { boards, currentBoardId } = useGlobalContext() || {};
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
