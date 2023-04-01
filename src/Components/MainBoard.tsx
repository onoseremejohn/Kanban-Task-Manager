import styled from "styled-components";
import { useGlobalContext } from "../AppContext";
import SingleColumn from "./SingleColumn";
import { useState, useRef, MouseEvent } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DragStart,
  ResponderProvided,
  DragUpdate,
} from "@hello-pangea/dnd";

const MainBoard = () => {
  const WrapperRef = useRef<HTMLElement | null>(null);
  const {
    boards,
    currentBoardId,
    sidebarOpen,
    openAddNewOrEditBoard = () => {},
    sameColumnReorder = () => {},
    diffColumnReorder = () => {},
    reOrderColumns = () => {},
  } = useGlobalContext() || {};
  const data = boards?.find((board) => board.id === currentBoardId);

  const [start, setStart] = useState({ X: 0, Y: 0 });
  const [scroll, setScroll] = useState({ X: 0, Y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: MouseEvent) => {
    if (WrapperRef.current) {
      setIsDragging(true);
      setStart({
        X: event.pageX - WrapperRef.current.offsetLeft,
        Y: event.pageY - WrapperRef.current.offsetTop,
      });
      setScroll({
        X: WrapperRef.current.scrollLeft,
        Y: WrapperRef.current.scrollTop,
      });
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    event.preventDefault();
    if (WrapperRef.current && isDragging) {
      const xy = {
        x: event.pageX - WrapperRef.current.offsetLeft,
        y: event.pageY - WrapperRef.current.offsetTop,
      };
      const walk = { X: (xy.x - start.X) * 2, Y: xy.y - start.Y };
      WrapperRef.current.scrollLeft = scroll.X - walk.X;
      WrapperRef.current.scrollTop = scroll.Y - walk.Y;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === "COLUMN") {
      reOrderColumns(draggableId, destination.index);
    } else {
      if (source.droppableId === destination.droppableId)
        sameColumnReorder(draggableId, source.droppableId, destination.index);
      if (source.droppableId !== destination.droppableId)
        diffColumnReorder(
          draggableId,
          source.droppableId,
          destination.droppableId,
          destination.index
        );
    }
  };

  const onDragStart = (start: DragStart, provided: ResponderProvided) => {
    const message =
      start.type === "TASK"
        ? `You have lifted the task in position ${start.source.index + 1}`
        : `You have lifted the status in position ${start.source.index + 1}`;
    provided.announce(message);
  };
  const onDragUpdate = (update: DragUpdate, provided: ResponderProvided) => {
    let message = "";
    if (!update.destination) {
      message = "You are currently not over a droppable area";
    } else if (update.type === "TASK") {
      message = `You have moved the task to position ${
        update.destination.index + 1
      }`;
    } else if (update.type === "COLUMN") {
      message = `You have moved the status to position ${
        update.destination.index + 1
      }`;
    }
    provided.announce(message);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <Wrapper
            className="scrollbar-style"
            sidebarOpen={sidebarOpen}
            ref={(el) => {
              WrapperRef.current = el;
              provided.innerRef(el);
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            {...provided.droppableProps}
          >
            <div className="move">
              {data?.columns.map((x, index) => {
                return <SingleColumn key={x.id} {...x} index={index} />;
              })}

              {boards?.length === 0 && (
                <Empty>
                  <p>This app is empty. Create a new board to get started</p>
                  <button
                    className="btn"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddNewOrEditBoard("add");
                    }}
                  >
                    Create New Board
                  </button>
                </Empty>
              )}
              {provided.placeholder}
              {boards &&
                data &&
                boards.length > 0 &&
                data.columns.length < 6 && (
                  <NewColumn>
                    <div>&nbsp;</div>
                    <div
                      className="gradient"
                      role="button"
                      aria-label="Add new column"
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddNewOrEditBoard("column");
                      }}
                    >
                      <p className="absolute-center font-bold">+ New Column</p>
                    </div>
                  </NewColumn>
                )}
            </div>
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

interface WrapperProps {
  sidebarOpen?: boolean;
}

const Wrapper = styled.main<WrapperProps>`
  margin-top: 5rem;
  overflow: scroll;
  height: calc(100vh - 5rem);
  transition: margin-left 0.3s ease-in-out;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media screen and (min-width: 768px) {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "300px" : "0")};
  }

  &::-webkit-scrollbar {
    height: 0.4rem;
  }

  .move {
    cursor: move;
    display: flex;
    gap: 2em;
    padding: 2em;
    min-width: fit-content;
  }
`;

const Empty = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  text-align: center;
`;

const NewColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  height: calc(100vh - 8rem);
  min-width: 17rem;
  .gradient {
    min-height: 100%;
    position: relative;
    border-radius: var(--radius);
    background: linear-gradient(
      to bottom,
      rgba(121, 132, 147, 0.2),
      rgba(130, 143, 163, 0.1),
      rgba(130, 143, 163, 0)
    );
    cursor: pointer;
    &:hover {
      p {
        color: var(--purple);
      }
    }
  }
  p {
    font-size: 1.2rem;
    color: var(--grey);
  }
`;

export default MainBoard;
