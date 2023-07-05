import React, { useRef } from "react";
import "./Pieces.css";
import Piece from "./Piece";
import { copyPosition } from "../../helper";
import { useAppContext } from "../contexts/Context";
import { makeNewMove } from "../../reducer/actions/move";

const Pieces = () => {
  const ref = useRef();

  const { appState, dispatch } = useAppContext();
  const currentPosition = appState.position[appState.position.length - 1];
  console.log(currentPosition);

  const calculateCoords = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    console.log(x);
    console.log(y);
    return { x, y };
  };

  const onDrop = (e) => {
    const newPosition = copyPosition(currentPosition);

    const { x, y } = calculateCoords(e);

    const [p, rank, file] = e.dataTransfer.getData("text").split(",");

    newPosition[rank][file] = "";
    console.log(p, rank, file);

    newPosition[x][y] = p;

    dispatch(makeNewMove({ newPosition }));
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} className="pieces" onDrop={onDrop} onDragOver={onDragOver}>
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
              key={rank + "-" + file}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;
