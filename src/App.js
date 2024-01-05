
import { useState, useRef } from "react";

function Square( {value, background, onSquareClick} ) {
  
  return (
    <button style={{backgroundColor:background}} className="square" onClick={onSquareClick}>
      {value}
    </button> 
  ); 

}

function Board({ xIsNext, squares, onPlay, backgroundColors }) {
  
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares, backgroundColors)) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X";      
    } else {
      nextSquares[i] = "O";
    }    
    onPlay(nextSquares);    
  }

  const winner = calculateWinner(squares, backgroundColors);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "0");    
    backgroundColors.fill("white");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} background = {backgroundColors[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} background = {backgroundColors[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} background = {backgroundColors[2]} onSquareClick={() => handleClick(2)} />
      </div>      
      <div className="board-row">
        <Square value={squares[3]} background = {backgroundColors[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} background = {backgroundColors[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} background = {backgroundColors[5]} onSquareClick={() => handleClick(5)} />
      </div>      
      <div className="board-row">
        <Square value={squares[6]} background = {backgroundColors[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} background = {backgroundColors[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} background = {backgroundColors[8]} onSquareClick={() => handleClick(8)} />
      </div>      
    </>
  ) 
}


export default function Game() {  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [backgroundColors, setBackgroundColors] = useState(Array(9).fill("white"));

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);    
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);    
  }

  const moves = history.map((squares, move) => {
    let description;
    let item_returned;
    if (move == 0) {
      description = 'Go to game start';
      item_returned = (
        <li key = {move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    } else if (move > 0 && move < history.length - 1) {
      description = 'Go to move #' + move;
      item_returned = (
        <li key = {move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    } else {
      item_returned = (
        <li key = {move}>
          You are at move #{move}
        </li>
      );
    }

    return item_returned;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext = {xIsNext} squares = {currentSquares} backgroundColors={backgroundColors} onPlay = {handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares, backgroundColors) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      backgroundColors[a] = "yellow";
      backgroundColors[b] = "yellow";
      backgroundColors[c] = "yellow";
      return squares[a];
    }
  }
  return null;
}