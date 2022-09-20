import React, { useEffect, useState } from "react";
import "./game.css";

function Game() {
  // Variables
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [game, setGame] = useState(["", "", "", "", "", "", "", "", ""]);
  const [winner, setWinner] = useState("");
  const element = document.querySelector(".winner");
  const element2 = document.querySelector(".buttons");

  // Constantly Calling checkForWinner() Looking For A Winner
  useEffect(() => {
    checkForWinner();
  });

  // Click Function
  const handleClick = (index) => {
    let newArr = [...game];
    if (newArr[index] !== "") {
      return;
    } else if (currentPlayer === "X") {
      newArr[index] = currentPlayer;
      setCurrentPlayer("O");
    } else {
      newArr[index] = currentPlayer;
      setCurrentPlayer("X");
    }
    setGame(newArr);
    console.log(newArr);
  };

  // Game Event After A Win
  const handleWin = () => {
    if (winner !== "") {
      element.style.display = "flex";
      element2.style.display = "none";
      console.log(`Winner is ${winner}`);
      return;
    }
  };

  // Function Checkin For Winners Based On Given Conbinations
  const checkForWinner = () => {
    // Comparing Three Different Values
    function checkThree(a, b, c) {
      if (!a || !b || !c) {
        return;
      } else if (a === b && b === c) {
        setWinner(a);
        handleWin();
        return;
      }
    }
    // Checking All The Different Winning Conbinations
    checkThree(game[0], game[1], game[2]);
    checkThree(game[3], game[4], game[5]);
    checkThree(game[6], game[7], game[8]);
    checkThree(game[0], game[3], game[6]);
    checkThree(game[1], game[4], game[7]);
    checkThree(game[2], game[5], game[8]);
    checkThree(game[0], game[4], game[8]);
    checkThree(game[2], game[4], game[6]);

    // Checking For Draw
    for (let i = 0; i < game.length; i++) {
      if (game[i] === "") {
        return;
      } else if (game[i] === 8) {
        setWinner("DRAW");
        handleWin();
      }
    }
  };

  // Resets The Game And All State Variables Back To It's Initial Values
  const newGame = () => {
    element.style.display = "none";
    element2.style.display = "inline";
    setGame(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
    setCurrentPlayer("X");
  };

  return (
    <div>
      <h1 className="title">Tic Tac Toe</h1>
      <div className="bb">
        <h2>Turn: {currentPlayer}</h2>
      </div>
      <div className="winner">
        <div>
          <h2>{winner}</h2>
          {winner === "DRAW" ? <p>no winners</p> : <p>wins</p>}
        </div>
        <button onClick={() => newGame()}>New Game</button>
      </div>
      <div className="game-board">
        {game.map((value, index) => {
          return (
            <button
              key={index}
              className="cell"
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          );
        })}
      </div>
      <div className="center">
        <button className="buttons" onClick={() => newGame()}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default Game;
