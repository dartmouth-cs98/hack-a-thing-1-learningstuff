import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// create functional component for Square which takes props as input and returns what should be rendered
function Square(props) {
  return (
    <button 
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // mains the value of the 9 squares in one location so we can check for a winner
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // set the first move to be "X"
      xIsNext:true,
    };
  }

  // the Square calls handleClick when clicked
  // each time a player moves, xIsNext (boolean) will flip to determine who goes next
  handleClick(i) {
    // creates a copy of the squares array to modify instead of modifying the existing array
    const squares = this.state.squares.slice();

    // return early by ignoring a click if the game is already won or if a square is already filled 
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // flip xIsNext boolean
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }


  renderSquare(i) {
    return (
      <Square
      // each Square receives a value prop that will either be "X", "O", or "null"
        value={this.state.squares[i]} 
        // Board passes on handleClick to the square so Square can indirectly update Board's state
        onClick={()=> this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      // if the game is won, display the winner
      status = 'Winner: ' + winner;
    } else {
      // if the game is not won, display which player goes next
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// determine winner and show when the game is won and there are no more turns to make
function calculateWinner(squares) {
  // different combinations of winning
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
