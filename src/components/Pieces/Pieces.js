import React, { useState, useRef } from "react";
import "./Pieces.css";
import Piece from "./Piece";
import { createPosition, copyPosition } from "../../helper";

const Pieces = () => {
  const [state, setState] = useState(createPosition());

  const ref = useRef();

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
    const newPosition = copyPosition(state);

    const { x, y } = calculateCoords(e);

    const [p, rank, file] = e.dataTransfer.getData("text").split(",");

    newPosition[rank][file] = "";
    console.log(p, rank, file);

    newPosition[x][y] = p;

    setState(newPosition);
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} className="pieces" onDrop={onDrop} onDragOver={onDragOver}>
      {state.map((r, rank) =>
        r.map((f, file) =>
          state[rank][file] ? (
            <Piece
              rank={rank}
              file={file}
              piece={state[rank][file]}
              key={rank + "-" + file}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;
