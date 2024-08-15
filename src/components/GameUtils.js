export const getTitleAndStyle = (gameStarted, items, nextNumber, gameOver) => {
  let title = "LET'S PLAY";
  let style = { color: "black" };

  if (gameStarted && items.length > 0) {
    title = "LET'S PLAY";
    style = { color: "black" };
  } else if (items.length === 0 && nextNumber > 1) {
    title = "ALL CLEARED";
    style = { color: "green" };
  } else if (gameOver) {
    title = "GAME OVER";
    style = { color: "red" };
  }

  return { title, style };
};

export const startOrResetGame = (
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
) => {
  const count = parseInt(itemCount, 10);
  if (isNaN(count) || count <= 0) {
    return false;
  }

  if (intervalId) {
    clearInterval(intervalId);
  }

  timeouts.forEach((timeout) => clearTimeout(timeout));
  setTimeouts([]);

  setTransitionClass("fast-transition");
  setTimeout(() => setTransitionClass(""), 0);

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
  setClickedItems([]);
  setGameOver(false);

  const startTime = Date.now();
  const id = setInterval(() => {
    setTimeElapsed(((Date.now() - startTime) / 1000).toFixed(1));
  }, 100);
  setIntervalId(id);

  return true;
};
