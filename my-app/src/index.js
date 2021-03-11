import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {  
  
  renderSquare(i) {
    return <Square 
    value={this.props.squares[i]}
    onClick={() => this.props.handleClick(i)}
    />;
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

function PastMoves(props){

}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPlayer: 'X',
      squares: Array(9).fill(null),
      history: Array(0).fill(null)
    }
    this.state.history.push(this.state.squares);
  }

  getStatus(){
    const winner = calculateWinner(this.state.squares);    
    let status;
    if(winner)
      status = 'Winner: ' + winner
    else
      status = 'Next player: ' + this.state.currentPlayer;

    return status
  }

  render() {
    const history = this.state.history;
    const moves = history.map((step, move) =>{
      let description
      if(move)
        description = "Go to move " + (move+1)
      else
        description = "First Move"
      return (
        <li>
          <button onClick={()=>this.handlePassedMoveButton(move)}>{description}</button>
        </li>
      )
    });
    return (      

      <div className="game">
        <div className="game-board">
          <Board 
          squares={this.state.squares}
          currentPlayer={this.state.currentPlayer}
          handleClick={(i)=> this.handleClick(i)} 
          />
        </div>
        <div className="game-info">
          <div>{this.getStatus()}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handlePassedMoveButton(moveNumber){
    alert("Move number: " + moveNumber)
    let history = this.state.history.slice();
    history.splice(moveNumber, 1);
    const squares = history[history.length-1]
    this.setState({squares: squares, history: history});

    //set to correct player
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    if(squares[i]) return;
    if(calculateWinner(squares)) return;
    
    squares[i] = this.state.currentPlayer;
    this.setState({squares: squares});
    this.updatePlayer();
    this.updateHistory(); 
  }

  updatePlayer(){
    if(this.state.currentPlayer === 'X')
      this.setState({currentPlayer: 'O'})
    else
      this.setState({currentPlayer: 'X'})
  }

  updateHistory(){
    const history = this.state.history.slice();
    history.push(this.state.squares);
    this.setState({history: history});    
  }

}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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