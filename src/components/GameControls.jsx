import React from "react";

const GameControls = ({
  itemCount,
  setItemCount,
  timeElapsed,
  gameStarted,
  startOrResetGame,
  hasStarted,
}) => (
  <div className="row col-md-6 row-cols-2">
    <h4>Points:</h4>
    <div>
      <input
        min="1"
        value={itemCount}
        onChange={(e) => setItemCount(e.target.value)}
        className="ps-2"
      />
    </div>
    <h4>Time: </h4>
    <h4>{timeElapsed}s</h4>
    <div>
      <button
        onClick={() => startOrResetGame(gameStarted)}
        className="px-5 mb-3 border border-secondary rounded-1"
      >
        {hasStarted ? "Restart" : "Play"}
      </button>
    </div>
  </div>
);

export default GameControls;
