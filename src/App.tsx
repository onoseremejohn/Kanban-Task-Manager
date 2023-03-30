import { useGlobalContext } from "./AppContext";
import Header from "./Components/Header";
import Overlay from "./Components/Overlay";
import Sidebar from "./Components/Sidebar";
import MainBoard from "./Components/MainBoard";
import { ShowSidebar } from "./assets/Icons";

export default () => {
  const { sidebarOpen, sidebar = () => {} } = useGlobalContext() || {};

  return (
    <>
      <Header />
      <MainBoard />
      <Sidebar />
      <button
        type="button"
        className={sidebarOpen ? "show-sidebar open" : "show-sidebar close"}
        onClick={() => {
          sidebar("open");
        }}
      >
        <ShowSidebar />
      </button>
      <Overlay />
    </>
  );
};
