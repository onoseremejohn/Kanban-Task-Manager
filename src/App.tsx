import { useGlobalContext } from "./AppContext";
import Header from "./Components/Header";
import Overlay from "./Components/Overlay";
import SingleColumn from "./Components/SingleColumn";

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
      </main>
      <Overlay />
    </>
  );
};
