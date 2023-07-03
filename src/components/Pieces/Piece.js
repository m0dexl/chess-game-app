import React from "react";

const Piece = ({ rank, file, piece }) => {
  return (
    <div
      className={`piece ${piece} p-${file}${rank}`}
      draggable={true}
      onClick={() => console.log(`file:${file} and rank=${rank}`)}
    />
  );
};

export default Piece;
