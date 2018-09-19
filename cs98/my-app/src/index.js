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
  renderSquare(i) {
    return (
      <Square
      // each Square receives a value prop that will either be "X", "O", or "null"
        value={this.props.squares[i]} 
        onClick={()=> this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  // set up initial state for the Game component within its constructor
  // maintains the value of the 9 squares in one location so we can check for a winner
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      // step number starts as 0
      stepNumber: 0,
      // set the first move to be "X"
      xIsNext: true,
    };
  }

  handleClick(i) {
    // ensures if we go back in time and make a new move from that point, 
    // we throw away future history that now would be incorrect
    const history = this.state.history.slice(0, this.state.stepNumber +1);
    const current = history[history.length - 1];

    // creates a copy of the squares array to modify instead of modifying the existing array
    const squares = current.squares.slice();

    // return early by ignoring a click if the game is already won or if a square is already filled 
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // each time a player moves, xIsNext (boolean) will flip to determine who goes next
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // method to update stepNumber
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      // update xIsNext to true if number we are changing stepNumber to is even
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // use most recent history entry to determine and display the game's status
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // map over the history
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        // for each move in the tic-tac-toe's game's history, we create a list item contains a button
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      // if the game is won, display the winner
      status = 'Winner: ' + winner;
    } else {
      // if the game is not won, display which player goes next
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
