declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string;
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
} from "./actions";
import { StateType, Id, TasksType, BoardType } from "./types";
const lightTheme = {
  body: "#FFF",
  text: "#363537",
};

const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }
`;

const AppContext = createContext<StateType | null>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: StateType = {
    theme: "light",
    boards: [],
    showBoardMenu: false,
    viewTaskModal: false,
    modifyTask: false,
    editDeleteMenu: false,
    boardIds: [],
    currentBoardId: "",
    selectedTask: { task: null, statusIds: [], columnId: 0 },
    deleteWarning: false,
    editOrAddNewBoardModal: false,
    editBoardFlag: false,
    addNewColumnFlag: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const isLight = state.theme === "light";
  useEffect(() => {
    const payload = JSON.parse(JSON.stringify(data));
    dispatch({
      type: LOAD,
      payload: payload.boards,
    });
  }, []);
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
