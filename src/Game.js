import React, { Component } from 'react'

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

let pluses; //global variable-massive with index (positions) of ships
let rand; //number for positions of ships


class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(15).fill(null),  //4x4 
        countMove: 9, //count of move down
      };
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (!this.state.countMove || (squares[i]) || isWinner(this.state.squares)) {  //definition of win
        return;
      }
      
      if (this.state.countMove) {
         squares[i] = (pluses.find(elem => elem === i)) ? '+': '-';  //if find from global 'pluses' ships, then plus
      }
      else squares[i] = null;
       


      this.setState({
        squares: squares,
        countMove: this.state.countMove - 1,
      });
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const isWin = isWinner(this.state.squares);
      let status;
      if (isWin) {
        status = 'Победа!!!';
      } else {
        status = (!this.state.countMove) ? 'Вы проиграли': 'Осталось ходов: ' + this.state.countMove;
      }

      

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
          </div>
          <div className="board-row">
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
        </div>
      );
    }
}

export default class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    )
  }
}

 /*function generateRandom(){
   rand = Math.floor(Math.random() * Math.floor(10));
 }*/

function isWinner(squares) {

    

    const obj = [  ,   ,'+','+', 
                   ,   ,   ,   ,
                '+','+','+',   ,
                   ,   ,   ,   ];  //positions og ships
    let counter = 0;
   
    pluses = obj.map((elem, index) => elem ? index: null);
    console.log(pluses);

    for (let i = 0; i < obj.length; i++) {
        if (squares[i] && obj[i]){
          counter++;
        }
    }
    if (counter === obj.reduce((acc, elem) => elem ? acc + 1 : acc, 0)){
      return true;
    }
      
    return null;
  }
