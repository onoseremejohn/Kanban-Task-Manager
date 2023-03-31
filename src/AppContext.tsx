declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string;
    white: string;
    modalText: string;
    modifyToggle: string;
    headerText: string;
    borderLine: string;
    cancelColor: string;
    cancelBg: string;
  }
}
import data from "./assets/json/data.json";
import {
  useContext,
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  ChangeEvent,
} from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reducer from "./reducer";
import {
  LOAD,
  OPENBOARDMENU,
  CLOSEMODAL,
  SELECTBOARD,
  VIEWTASKMODAL,
  TOGGLESUBTASK,
  CHANGESTATUS,
  MODIFYTASKMODAL,
  EDITTASK,
  DELETETASKORBOARDMODAL,
  FILTERDELETETASK,
  EDITDELETEMENUTOGGLE,
  FILTERDELETEBOARD,
  OPENADDNEWBOARDMODAL,
  ADDNEWBOARD,
  OPENEDITBOARDMODAL,
  EDITBOARD,
  ADDNEWCOLUMNMODAL,
  TOGGLETHEME,
  SIDEBAR,
  SAMECOLUMNREORDER,
  DIFFCOLUMNREORDER,
  REORDERCOLUMNS,
} from "./actions";
import { StateType, Id, TasksType, BoardType, LocalStorageType } from "./types";
const lightTheme = {
  body: "#f4f7fd;",
  text: "#363537",
  white: "#fff",
  modalText: "#828fa3",
  headerText: "#000",
  modifyToggle: "#fff",
  borderLine: "#e4ebfa",
  cancelColor: "#635fc7",
  cancelBg: "#fff",
};

const darkTheme = {
  body: "#20212c",
  text: "#FAFAFA",
  white: "#2b2c37",
  modalText: "#fff",
  headerText: "#fff",
  modifyToggle: "#20212c",
  borderLine: "#3e3f4e",
  cancelColor: "#fff",
  cancelBg: "transparent",
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
`;

function getLocalStorage(): LocalStorageType {
  const data = localStorage.getItem("onos-kanban");
  return data
    ? JSON.parse(data)
    : { theme: "dark", boards: [], boardIds: [], currentBoardId: "" };
}

const AppContext = createContext<StateType | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: StateType = {
    theme: getLocalStorage().theme,
    boards: getLocalStorage().boards,
    showBoardMenu: false,
    viewTaskModal: false,
    modifyTask: false,
    editDeleteMenu: false,
    boardIds: getLocalStorage().boardIds,
    currentBoardId: getLocalStorage().currentBoardId,
    selectedTask: { task: null, statusIds: [], columnId: 0 },
    deleteWarning: false,
    editOrAddNewBoardModal: false,
    editBoardFlag: false,
    addNewColumnFlag: false,
    sidebarOpen: true,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const isLight = state.theme === "light";
  useEffect(() => {
    const localStorageData = localStorage.getItem("onos-kanban");
    if (localStorageData && state.boards.length > 0) return;
    const payload = JSON.parse(JSON.stringify(data));
    dispatch({
      type: LOAD,
      payload: payload.boards,
    });
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "onos-kanban",
      JSON.stringify({
        theme: state.theme,
        boards: state.boards,
        boardIds: state.boardIds,
        currentBoardId: state.currentBoardId,
      })
    );
  }, [state.theme, state.boards, state.boardIds, state.currentBoardId]);
  const openBoardMenu = () => dispatch({ type: OPENBOARDMENU });
  const closeModal = () => dispatch({ type: CLOSEMODAL });
  const selectBoard = (id: Id) => dispatch({ type: SELECTBOARD, payload: id });
  const openTask = (columnId: Id, taskId: Id) =>
    dispatch({ type: VIEWTASKMODAL, payload: { columnId, taskId } });
  const toggleSubtask = (e: ChangeEvent<HTMLInputElement>, id: Id) => {
    dispatch({ type: TOGGLESUBTASK, payload: { e, id } });
  };
  const changeStatus = (id: Id) => {
    dispatch({ type: CHANGESTATUS, payload: id });
  };
  const modify = (a?: "delete") => {
    if (!a) dispatch({ type: MODIFYTASKMODAL });
    else dispatch({ type: DELETETASKORBOARDMODAL });
  };
  const editTask = (task: TasksType, val: Boolean) =>
    dispatch({ type: EDITTASK, payload: { task, val } });
  const deleteTask = (id: Id) =>
    dispatch({ type: FILTERDELETETASK, payload: id });
  const editDeleteToggle = () => dispatch({ type: EDITDELETEMENUTOGGLE });
  const deleteBoard = (id?: Id) =>
    dispatch({ type: FILTERDELETEBOARD, payload: id });
  const openAddNewOrEditBoard = (a: "add" | "edit" | "column") => {
    if (a === "add") dispatch({ type: OPENADDNEWBOARDMODAL });
    if (a === "edit") dispatch({ type: OPENEDITBOARDMODAL });
    if (a === "column") dispatch({ type: ADDNEWCOLUMNMODAL });
  };
  const addNewBoard = (board: BoardType) =>
    dispatch({ type: ADDNEWBOARD, payload: board });
  const editBoard = (board: BoardType) =>
    dispatch({ type: EDITBOARD, payload: board });
  const toggleTheme = () => dispatch({ type: TOGGLETHEME });
  const sidebar = (val: "open" | "close") =>
    dispatch({ type: SIDEBAR, payload: val });

  const sameColumnReorder = (
    taskId: string,
    columnId: string,
    destinationIndex: number
  ) =>
    dispatch({
      type: SAMECOLUMNREORDER,
      payload: { taskId, columnId, destinationIndex },
    });

  const diffColumnReorder = (
    taskId: string,
    sourceColId: string,
    destColId: string,
    destinationIndex: number
  ) =>
    dispatch({
      type: DIFFCOLUMNREORDER,
      payload: { taskId, sourceColId, destColId, destinationIndex },
    });

  const reOrderColumns = (colId: string, destinationIndex: number) =>
    dispatch({
      type: REORDERCOLUMNS,
      payload: { colId, destinationIndex },
    });

  return (
    <AppContext.Provider
      value={{
        ...state,
        openBoardMenu,
        closeModal,
        selectBoard,
        openTask,
        toggleSubtask,
        changeStatus,
        modify,
        editTask,
        deleteTask,
        editDeleteToggle,
        deleteBoard,
        addNewBoard,
        openAddNewOrEditBoard,
        editBoard,
        toggleTheme,
        sidebar,
        sameColumnReorder,
        diffColumnReorder,
        reOrderColumns,
      }}
    >
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const useGlobalContext = (): StateType | null => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
