import {
  forwardRef,
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from "react";
import styled from "styled-components";
import { useGlobalContext } from "../AppContext";
import { Close, ChevronDown } from "../assets/Icons";
import { nanoid } from "nanoid";
import { TasksType, Id } from "../types";
import { statusName } from "../helpers";
const ModifyTask = forwardRef<HTMLDivElement>((props, ref) => {
  const showRef = useRef<HTMLDivElement>(null);
  const {
    closeModal = () => {},
    selectedTask,
    boards,
    currentBoardId,
    editTask = () => {},
  } = useGlobalContext() || {};
  const task = selectedTask?.task;
  const statusIds = boards
    ?.find((b) => b.id === currentBoardId)
    ?.columns.map((c) => c.id);
  let columnId = selectedTask?.columnId;
  columnId = columnId ? columnId : statusIds ? statusIds[0] : undefined;
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((s) => !s);
  const closeShow = (e: MouseEvent<HTMLDivElement>) => {
    if (show && !showRef.current?.contains(e.target as Node)) setShow(false);
  };
  const newSubtask: TasksType["subtasks"] = [
    {
      id: nanoid(),
      title: "",
      isCompleted: false,
    },
  ];

  const [tempStatusId, setTempStatusId] = useState(columnId);

  const [info, setInfo] = task
    ? useState({ title: task.title, description: task.description })
    : useState({ title: "", description: "" });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    if (/^\s+$/.test(value)) return;
    setInfo({ ...info, [name]: value });
  };

  let subtasks: TasksType["subtasks"],
    setSubtasks: React.Dispatch<React.SetStateAction<TasksType["subtasks"]>>;
  [subtasks, setSubtasks] = task
    ? useState([...task.subtasks])
    : useState([...newSubtask]);

  const handleSubtasksChange = (id: Id, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\s+$/.test(value)) return;
    const updated = subtasks.map((s) => {
      if (s.id === id) return { ...s, title: value };
      return s;
    });
    setSubtasks(updated);
  };

  const addNewSubtask = () => {
    if (subtasks.length >= 6) return;
    setSubtasks([
      ...subtasks,
      {
        id: nanoid(),
        title: "",
        isCompleted: false,
      },
    ]);
  };

  const handleDelete = (id: Id) => {
    const updated = subtasks.filter((s) => s.id !== id);
    setSubtasks(updated);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = statusName(boards, currentBoardId, tempStatusId);
    let payload: TasksType;
    if (task && status && (tempStatusId || tempStatusId == 0)) {
      payload = {
        ...task,
        title: info.title,
        description: info.description,
        status,
        statusId: tempStatusId,
        subtasks,
      };
      editTask(payload, true);
    } else if (!task && status && (tempStatusId || tempStatusId == 0)) {
      payload = {
        id: nanoid(),
        title: info.title,
        description: info.description,
        status,
        statusId: tempStatusId,
        subtasks,
      };
      editTask(payload, false);
    }
    closeModal();
  };

  return (
    <Wrapper ref={ref} onClick={closeShow}>
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
      <h4>{task ? "Edit Task" : "Add New Task"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={info.title}
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={info.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="subtasks">Subtasks</label>

          {subtasks.map((s) => (
            <div
              style={{ display: "flex", alignItems: "center", gap: "1%" }}
              key={s.id}
            >
              <input
                type="text"
                id="subtasks"
                style={{ flexGrow: 1 }}
                value={s.title}
                onChange={(e) => handleSubtasksChange(s.id, e)}
              />
              <button
                type="button"
                style={{ padding: "7px" }}
                onClick={(e) => {
                  handleDelete(s.id);
                  e.stopPropagation();
                }}
              >
                <Close />
              </button>
            </div>
          ))}
        </div>
        {subtasks.length < 6 && (
          <button
            type="button"
            className="subtask"
            onClick={(e) => {
              addNewSubtask();
              e.stopPropagation();
            }}
          >
            + Add New Subtask
          </button>
        )}
        <div className="form-control" style={{ position: "relative" }}>
          <label>Status</label>
          <button
            type="button"
            className={show ? "status show" : "status"}
            onClick={toggleShow}
          >
            {statusName(boards, currentBoardId, tempStatusId)}
            <ChevronDown />
          </button>
          {show && (
            <div className="dropdown" ref={showRef}>
              {statusIds?.map((id) => {
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={(e) => {
                      setTempStatusId(id);
                      setShow(false);
                      e.stopPropagation();
                    }}
                  >
                    {statusName(boards, currentBoardId, id)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <button type="submit" className="submit">
          {task ? "Save Changes" : "Create Task"}
        </button>
      </form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  /* position: absolute; */
  /* left: 50%; */
  /* top: 10vh; */
  /* transform: translateX(-50%); */
  /* min-height: 70vh; */
  position: relative;
  height: auto;
  max-height: 90vh;
  overflow-y: scroll;
  width: 85vw;
  max-width: 500px;
  padding: 2.85em 1.5em;
  border-radius: var(--radius);
  h4 {
    color: ${({ theme }) => theme.headerText};
  }
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
  label {
    color: ${({ theme }) => theme.modalText};
    font-weight: 500;
  }
  textarea {
    background-color: inherit;
    color: inherit;
    border-radius: var(--radius);
    resize: none;
    padding: 0.5em 1em;
    outline: none;
    border: 2px solid #828fa366;
    &:focus-visible {
      border-color: var(--purple);
    }
  }
  input {
    color: inherit;
    background-color: inherit;
    height: 3em;
    padding: 0.5em 1em;
    border-radius: var(--radius);
    outline: none;
    border: 2px solid #828fa366;
    &:focus-visible {
      border-color: var(--purple);
    }
  }
  button {
    display: block;
  }
  .subtask {
    background-color: #f0effa;
    padding: 0.75em 0em;
    border-radius: 20px;
    color: var(--purple);
    font-weight: 600;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid rgba(130, 143, 163, 0.4);
    padding: 0.5em 1em;
    color: inherit;
    border-radius: var(--radius);
    margin-bottom: 1em;
    &:focus {
      border-color: #635fc7;
    }
    svg {
      transition: var(--transition);
    }
  }
  .status.show {
    svg {
      rotate: 180deg;
    }
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    align-items: start;
    box-shadow: var(--bs);
    position: absolute;
    bottom: calc(-100% - 0.5em);
    width: 100%;
    background-color: ${({ theme }) => theme.modifyToggle};
    color: var(--grey);
    button {
      color: inherit;
      width: 100%;
      text-align: start;
      padding: 0.5em 1em;
    }
  }
  .submit {
    background: #635fc7;
    padding: 0.75em 0em;
    color: white;
    font-weight: 600;
    border-radius: 20px;
  }
`;

export default ModifyTask;
