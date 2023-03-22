import styled from "styled-components";
import { forwardRef, useState, ChangeEvent, FormEvent } from "react";
import { Close } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import { nanoid } from "nanoid";
import { BoardType, Id, ColumnType } from "../types";
import { findBoard } from "../helpers";
// This is AddNewBoardModal and also Edit board Modal and also Add new column modal
const EditOrAddNewBoard = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    closeModal = () => {},
    addNewBoard = () => {},
    editBoardFlag,
    addNewColumnFlag,
    editBoard = () => {},
    boards,
    currentBoardId = 0,
  } = useGlobalContext() || {};
  const currentBoardName = findBoard(boards, currentBoardId) ?? "";
  const currentColumns = boards?.find((b) => b.id === currentBoardId)?.columns;
  const [columns, setColumns] =
    editBoardFlag || addNewColumnFlag
      ? useState<ColumnType[]>(currentColumns ? [...currentColumns] : [])
      : useState<ColumnType[]>([{ id: nanoid(), name: "", tasks: [] }]);
  const handleColumnsChange = (e: ChangeEvent<HTMLInputElement>, id: Id) => {
    const value = e.target.value;
    if (/^\s+$/.test(value)) return;
    setColumns((prevColumns) => {
      const updated = prevColumns.map((c) => {
        if (c.id === id) return { ...c, name: value };
        return c;
      });
      return updated;
    });
  };
  const [name, setName] =
    editBoardFlag || addNewColumnFlag
      ? useState(currentBoardName)
      : useState("");
  const addNewColumn = () => {
    if (columns.length >= 6) return;
    setColumns([...columns, { id: nanoid(), name: "", tasks: [] }]);
  };
  const deleteColumn = (id: Id) => {
    const updated = columns.filter((c) => c.id !== id);
    setColumns(updated);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload: BoardType;
    if (editBoardFlag || addNewColumnFlag) {
      payload = { id: currentBoardId, name, columns: [...columns] };
      editBoard(payload);
    } else {
      payload = { id: nanoid(), name, columns: [...columns] };
      addNewBoard(payload);
    }
    closeModal();
  };
  return (
    <Wrapper ref={ref}>
      <button
        type="button"
        className="close"
        onClick={(e) => {
          closeModal();
          e.stopPropagation();
        }}
      >
        <Close />
      </button>
      <h4>
        {editBoardFlag
          ? "Edit board"
          : addNewColumnFlag
          ? "Add New Column"
          : "Add New Board"}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="title"
            disabled={addNewColumnFlag}
            onChange={(e) => {
              if (/^\s+$/.test(e.target.value)) return;
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label htmlFor="columns">Columns</label>
          {columns.map((c) => (
            <div className={columns.length > 1 ? "flex" : "block"} key={c.id}>
              <input
                type="text"
                id="columns"
                value={c.name}
                onChange={(e) => handleColumnsChange(e, c.id)}
              />
              {columns.length > 1 && (
                <button
                  type="button"
                  style={{ padding: "7px" }}
                  onClick={(e) => {
                    deleteColumn(c.id);
                    e.stopPropagation();
                  }}
                  disabled={c.tasks.length > 0}
                >
                  <Close />
                </button>
              )}
            </div>
          ))}
        </div>
        {columns.length < 6 && (
          <button
            type="button"
            className="column"
            onClick={(e) => {
              addNewColumn();
              e.stopPropagation();
            }}
          >
            + Add New Column
          </button>
        )}
        <button type="submit" className="submit">
          {editBoardFlag || addNewColumnFlag
            ? "Save Changes"
            : "Create New Board"}
        </button>
      </form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.modalText};
  position: absolute;
  left: 50%;
  top: 10vh;
  transform: translateX(-50%);
  min-height: 70vh;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  .close {
    position: absolute;
    right: 3%;
    top: 1.5%;
    background: rgba(8, 8, 8, 0.1);
    padding: 0.4em;
    border-radius: var(--radius);
    display: grid;
    place-content: center;
  }
  h4 {
    color: ${({ theme }) => theme.headerText};
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  label {
    color: ${({ theme }) => theme.modalText};
    font-weight: 500;
  }
  input {
    height: 3em;
    padding: 0.5em 1em;
    border-radius: var(--radius);
    background-color: inherit;
    color: inherit;
    outline: none;
    border: 2px solid #828fa366;
    &:focus-visible {
      border-color: var(--purple);
    }
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 1%;
    input {
      flex-grow: 1;
    }
  }
  .block {
    input {
      display: block;
      width: 100%;
    }
  }
  button:disabled {
    opacity: 30%;
    cursor: not-allowed;
  }
  .column {
    background-color: #f0effa;
    padding: 0.75em 1em;
    border-radius: 20px;
    color: var(--purple);
    font-weight: 600;
  }
  .submit {
    background: #635fc7;
    padding: 0.75em 1em;
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
  input:disabled {
    opacity: 50%;
  }
`;

export default EditOrAddNewBoard;
