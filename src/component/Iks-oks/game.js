import React, { useState } from 'react';
import './Game.scss';
import clickSound from '../../sound/clickSound.wav';
import winnerSound from '../../sound/winSound.mp3';
import drawSound from '../../sound/drawSound.mp3'; 

const initialBoard = Array(9).fill(null);
const clickAudio = new Audio(clickSound);
const winnerAudio = new Audio(winnerSound);
const drawAudio = new Audio(drawSound);

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    clickAudio.play();

    const winner = calculateWinner(newBoard);
    if (winner === 'draw') {
      drawAudio.play();
    } else if (winner) {
      winnerAudio.play();
    }
  };

  const handleResetClick = () => {
    setBoard(initialBoard);

    clickAudio.play();
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      drawAudio.play();
      return 'draw';
    }

    return null;
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = winner === 'draw' ? "It's a draw!" : `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="app">
      <div className="board">
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
      </div>
      <div className="status">{status}</div>
      <button className="reset-button" onClick={handleResetClick}>
        Reset
      </button>
    </div>
  );
};

export default Game;
