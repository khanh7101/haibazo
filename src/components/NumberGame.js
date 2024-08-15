import React, { useState, useEffect } from "react";

const Game = () => {
  const [items, setItems] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [itemCount, setItemCount] = useState("");

  const startGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const count = parseInt(itemCount, 10);
    if (isNaN(count) || count <= 0) {
      alert("Vui lòng nhập số lượng item hợp lệ!");
      return;
    }

    const newItems = [];
    for (let i = 1; i <= count; i++) {
      newItems.push({
        number: i,
        x: Math.floor(Math.random() * 90),
        y: Math.floor(Math.random() * 90),
      });
    }
    setItems(newItems);
    setNextNumber(1);
    setTimeElapsed(0);
    setGameStarted(true);

    const startTime = Date.now();
    const id = setInterval(() => {
      setTimeElapsed(((Date.now() - startTime) / 1000).toFixed(1));
    }, 100);
    setIntervalId(id);
  };

  const restartGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const count = parseInt(itemCount, 10);
    if (isNaN(count) || count <= 0) {
      alert("Vui lòng nhập số lượng item hợp lệ!");
      return;
    }

    const newItems = [];
    for (let i = 1; i <= count; i++) {
      newItems.push({
        number: i,
        x: Math.floor(Math.random() * 90),
        y: Math.floor(Math.random() * 90),
      });
    }
    setItems(newItems);
    setNextNumber(1);
    setTimeElapsed(0);

    const startTime = Date.now();
    const id = setInterval(() => {
      setTimeElapsed(((Date.now() - startTime) / 1000).toFixed(1));
    }, 100);
    setIntervalId(id);
    setGameStarted(true);
  };

  const handleClick = (number) => {
    if (number === nextNumber) {
      setItems(items.filter((item) => item.number !== number));
      setNextNumber(nextNumber + 1);
      if (nextNumber >= items.length) {
        clearInterval(intervalId);
        alert(`Bạn đã hoàn thành game! Thời gian: ${timeElapsed}s`);
        setGameStarted(false);
      }
    } else {
      clearInterval(intervalId);
      alert("Sai thứ tự! Game over!");
      setGameStarted(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          min="1"
          value={itemCount}
          onChange={(e) => setItemCount(e.target.value)}
          placeholder="Nhập số lượng item"
          style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
        />
        <button
          onClick={gameStarted ? restartGame : startGame}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          {gameStarted ? "Restart" : "Play"}
        </button>
      </div>

      <h1>Thời gian đã trôi qua: {timeElapsed}s</h1>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          border: "1px solid black",
        }}
      >
        {items.length === 0 ? (
          <p></p>
        ) : (
          items.map((item) => (
            <div
              key={item.number}
              onClick={() => handleClick(item.number)}
              style={{
                position: "absolute",
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: "30px",
                height: "30px",
                lineHeight: "30px",
                backgroundColor: "white",
                color: "black",
                textAlign: "center",
                borderRadius: "50%",
                cursor: "pointer",
                userSelect: "none",
                zIndex: item.number,
                border: "2px solid black",
              }}
            >
              {item.number}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Game;
