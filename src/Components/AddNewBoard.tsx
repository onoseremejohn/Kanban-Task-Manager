import styled from "styled-components";
import { forwardRef, useState, ChangeEvent } from "react";
import { Close } from "../assets/Icons";
import { useGlobalContext } from "../AppContext";
import { nanoid } from "nanoid";
import { Id } from "../types";
const AddNewBoard = forwardRef<HTMLDivElement>((props, ref) => {
  const { closeModal = () => {} } = useGlobalContext() || {};
  const [columns, setColumns] = useState([{ id: nanoid(), name: "" }]);
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
    setColumns([...columns, { id: nanoid(), name: "" }]);
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
      <form>
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
            <input
              type="text"
              id="columns"
              value={c.name}
              name="columns"
              key={c.id}
              onChange={(e) => handleColumnsChange(e, c.id)}
            />
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
`;

export default AddNewBoard;
