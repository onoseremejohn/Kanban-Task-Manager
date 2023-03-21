import styled from "styled-components";
import { forwardRef, useState, ChangeEvent, FormEvent } from "react";
import { Close } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import { nanoid } from "nanoid";
import { BoardType, Id } from "../types";
// This is AddNewBoardModal and also Edit board Modal
const EditOrAddNewBoard = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    closeModal = () => {},
    addNewBoard = () => {},
    editBoardFlag,
    editBoard = () => {},
  } = useGlobalContext() || {};
  const [columns, setColumns] = useState([
    { id: nanoid(), name: "", tasks: [] },
  ]);
  const handleColumnsChange = (e: ChangeEvent<HTMLInputElement>, id: Id) => {
    const value = e.target.value;
    if (/^\s+$/.test(value)) return;
    const updated = columns.map((c) => {
      if (c.id === id) return { ...c, name: value };
      return c;
    });
    setColumns(updated);
  };
  const [name, setName] = useState("");
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
    payload = { id: nanoid(), name, columns: [...columns] };
    addNewBoard(payload);
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
      <h4>Add New Board</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            name="title"
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
            className="btn"
            onClick={(e) => {
              addNewColumn();
              e.stopPropagation();
            }}
          >
            Add New Column
          </button>
        )}
        <button type="submit" className="btn">
          Create New Board
        </button>
      </form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: white;
  position: absolute;
  left: 50%;
  top: 10vh;
  transform: translateX(-50%);
  min-height: 70vh;
  width: 85vw;
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
  input {
    height: 2em;
    padding: 0.5em 1em;
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
`;

export default EditOrAddNewBoard;
