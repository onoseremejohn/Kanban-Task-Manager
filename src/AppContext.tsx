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
} from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reducer from "./reducer";
import {
  LOAD,
  OPENBOARDMENU,
  CLOSEMODAL,
  SELECTBOARD,
  VIEWTASK,
} from "./actions";
import { StateType, Id } from "./types";
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
    boardIds: [],
    currentBoardId: "",
    selectedTask: { task: null, statusIds: [] },
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

  const editTask = () => {};

  return (
    <AppContext.Provider
      value={{
        ...state,
        openBoardMenu,
        closeModal,
        selectBoard,
        openTask,
        editTask,
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
