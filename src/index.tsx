import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

function calculateWinner(squares: string[]) {
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

type SquareProps = {
  value: string
  onClick: () => void
}

function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  )
}

type BoardProps = {
  squares: string[]
  onClick: (i: number) => void
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number): JSX.Element {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
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

type Squares = string[]

type GameState = {
  history: Squares[],
  xIsNext: boolean,
}

class Game extends React.Component<unknown, GameState> {
  constructor(props: unknown) {
    super(props)
    this.state = {
      history: [Array(9).fill('')],
      xIsNext: true,
    }
  }

  currentPlayer() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  handleClick(i: number) {
    const history = this.state.history
    const squares = history[history.length - 1]

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.currentPlayer()
    this.setState({
      history: [...history, squares],
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    const history = this.state.history
    const currentSquares = history[history.length - 1]
    const winner = calculateWinner(currentSquares)
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.currentPlayer()}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
