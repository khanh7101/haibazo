import React, { useState, useEffect, useCallback } from "react";
import NumberItem from "./NumberItem";
import GameControls from "./GameControls";
import TitleBar from "./TitleBar";
import { getTitleAndStyle, startOrResetGame } from "./GameUtils";
import "../styles/NumberGame.css";

const NumberGame = () => {
  const [items, setItems] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [itemCount, setItemCount] = useState("");
  const [clickedItems, setClickedItems] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeouts, setTimeouts] = useState([]);
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleClick = useCallback(
    (number) => {
      if (gameOver || clickedItems.includes(number)) return;

      if (number === nextNumber) {
        setClickedItems((prevClickedItems) => [...prevClickedItems, number]);

        setItems((prevItems) => {
          const newItems = prevItems.map((item) =>
            item.number === number ? { ...item, disappearing: true } : item
          );
          return newItems;
        });

        const timeoutId = setTimeout(() => {
          setItems((prevItems) => {
            const newItems = prevItems.filter((item) => item.number !== number);
            if (newItems.length === 0) {
              clearInterval(intervalId);
              setGameStarted(false);
            }
            return newItems;
          });
        }, 3000);

        setTimeouts((prevTimeouts) => [...prevTimeouts, timeoutId]);

        setNextNumber(nextNumber + 1);
      } else {
        setGameOver(true);
        clearInterval(intervalId);
        setGameStarted(false);
      }
    },
    [nextNumber, intervalId, gameOver, clickedItems]
  );

  const { title, style } = getTitleAndStyle(
    gameStarted,
    items,
    nextNumber,
    gameOver
  );

  const maxZIndex = items.length + 1;

  return (
    <div className="container mt-4">
      <TitleBar title={title} style={style} />
      <div className="row">
        <GameControls
          itemCount={itemCount}
          setItemCount={setItemCount}
          timeElapsed={timeElapsed}
          gameStarted={gameStarted}
          startOrResetGame={(isReset) => {
            const result = startOrResetGame(
              itemCount,
              setItems,
              setNextNumber,
              setTimeElapsed,
              setGameStarted,
              setClickedItems,
              setGameOver,
              setTransitionClass,
              setIntervalId,
              setTimeouts,
              intervalId,
              timeouts
            );
            if (result) setHasStarted(true);
          }}
          hasStarted={hasStarted}
        />
      </div>
      <div
        className="border border-dark position-relative"
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        {items.length === 0 ? (
          <div></div>
        ) : (
          items.map((item) => (
            <NumberItem
              key={item.number}
              item={item}
              handleClick={handleClick}
              gameOver={gameOver}
              clickedItems={clickedItems}
              maxZIndex={maxZIndex}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NumberGame;
