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
  VIEWTASK,
  TOGGLESUBTASK,
  CHANGESTATUS,
  MODIFYTASK,
  EDITTASK,
  DELETETASK,
  FILTERDELETE,
} from "./actions";
import { StateType, Id, TasksType } from "./types";
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
    viewTask: false,
    modifyTask: false,
    boardIds: [],
    currentBoardId: "",
    selectedTask: { task: null, statusIds: [], columnId: 0 },
    deleteWarning: false,
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
    dispatch({ type: VIEWTASK, payload: { columnId, taskId } });
  const toggleSubtask = (e: ChangeEvent<HTMLInputElement>, id: Id) => {
    dispatch({ type: TOGGLESUBTASK, payload: { e, id } });
  };
  const changeStatus = (id: Id) => {
    dispatch({ type: CHANGESTATUS, payload: id });
  };
  const modify = (a: string) => {
    if (!a) dispatch({ type: MODIFYTASK });
    else dispatch({ type: DELETETASK });
  };
  const editTask = (task: TasksType, val: Boolean) =>
    dispatch({ type: EDITTASK, payload: { task, val } });
  const deleteTask = (id: Id) => dispatch({ type: FILTERDELETE, payload: id });

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
