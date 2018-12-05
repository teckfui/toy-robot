import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import _ from 'lodash';
import './App.css';

var BOARD_DIMENSION = {
  rows: 5,
  cols: 5
};
var ROBOT_DIRECTIONS = {
  n: 'north',
  s: 'south',
  w: 'west',
  e: 'east'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        x: 0,
        y: 0
      },
      direction: ROBOT_DIRECTIONS.n
    }
    this.placeInput = '0,0,north';
    this.batchCommandInput = '';

    this.place = this.place.bind(this);
    this.executePlace = this.executePlace.bind(this);
    this.placeInputUpdate = this.placeInputUpdate.bind(this);
    this.batchCommandsFn = this.batchCommandsFn.bind(this);
    this.batchFn = this.batchFn.bind(this);
    this.move = this.move.bind(this);
    this.turnLeft = this.turnLeft.bind(this);
    this.turnRight = this.turnRight.bind(this);
    this.report = this.report.bind(this);
  }

  batchCommandsFn(evt) {
    this.batchCommandInput = evt.target.value;
  }

  batchFn() {
    var input = this.batchCommandInput.split("\n");
    var state;

    input.forEach((line) => {
      line = line.toLowerCase();
      if (line.indexOf(',') > 0 && line.indexOf('place ') === 0) {
        line = line.substr(6);
        state = this.executePlace(line);
      } else {
        switch(line) {
          case 'move':
            state = this.move(state);
            break;
          case 'left':
            state = this.turnLeft(state);
            break;
          case 'right':
            state = this.turnRight(state);
            break;
          case 'report':
            state = this.report(state);
            break;
        }
      }
      console.log(state);
    });
  }

  report(state) {
    if (!state.location) {
      state = this.state;
    }
    var message = state.location.x + ',' + state.location.y + ',' + state.direction.toUpperCase();
    alert(message);
  }

  placeInputUpdate(evt) {
    this.placeInput = evt.target.value;
  }

  executePlace(input) {
    input = input.split(',');
    if (input.length === 3) {
      var direction = input[2].toLowerCase();
      var x = parseInt(input[0]);
      var y = parseInt(input[1]);
      if (x >= 0 && x < BOARD_DIMENSION.cols) {
        if (y >= 0 && y < BOARD_DIMENSION.rows) {
          if (_.includes(ROBOT_DIRECTIONS, direction)) {
            var state = {
              location: {
                x: x,
                y: y
              },
              direction: direction
            };
            console.log(state);
            this.setState(state);

            return state;
          }
        }
      }
    }
  }

  place() {
    this.executePlace(this.placeInput);
  }

  move(state) {
    if (!state.location) {
      state = this.state;
    }
    switch (state.direction) {
      case ROBOT_DIRECTIONS.n:
        state.location.y++;
        if (state.location.y >= BOARD_DIMENSION.rows) {
          state.location.y = BOARD_DIMENSION.rows - 1;
        }
        break;
      case ROBOT_DIRECTIONS.s:
        state.location.y--;
        if (state.location.y < 0) {
          state.location.y = 0;
        }
        break;
      case ROBOT_DIRECTIONS.e:
        state.location.x++;
        if (state.location.x >= BOARD_DIMENSION.cols) {
          state.location.x = BOARD_DIMENSION.cols - 1;
        }
        break;
      case ROBOT_DIRECTIONS.w:
        state.location.x--;
        if (state.location.x < 0) {
          state.location.x = 0;
        }
        break;
    }

    this.setState(state);

    return state;
  }

  turnLeft(state) {
    if (!state.location) {
      state = this.state;
    }
    switch (state.direction) {
      case ROBOT_DIRECTIONS.n:
        state.direction = ROBOT_DIRECTIONS.w;
        break;
      case ROBOT_DIRECTIONS.s:
        state.direction = ROBOT_DIRECTIONS.e;
        break;
      case ROBOT_DIRECTIONS.e:
        state.direction = ROBOT_DIRECTIONS.n;
        break;
      case ROBOT_DIRECTIONS.w:
        state.direction = ROBOT_DIRECTIONS.s;
        break;
    }

    this.setState(state);

    return state;
  }

  turnRight(state) {
    if (!state.location) {
      state = this.state;
    }

    switch (state.direction) {
      case ROBOT_DIRECTIONS.n:
        state.direction = ROBOT_DIRECTIONS.e;
        break;
      case ROBOT_DIRECTIONS.s:
        state.direction = ROBOT_DIRECTIONS.w;
        break;
      case ROBOT_DIRECTIONS.e:
        state.direction = ROBOT_DIRECTIONS.s;
        break;
      case ROBOT_DIRECTIONS.w:
        state.direction = ROBOT_DIRECTIONS.n;
        break;
    }

    this.setState(state);

    return state;
  }

  render() {
    console.log(this.state);
    return (
      <div className="toy-robot">
        <GameBoard
          rows={BOARD_DIMENSION.rows}
          cols={BOARD_DIMENSION.cols}
          locationX={this.state.location.x}
          locationY={this.state.location.y}
          direction={this.state.direction}
        />
        <GameControls 
          moveFn={this.move} 
          turnRightFn={this.turnRight} 
          turnLeftFn={this.turnLeft} 
          reportFn={this.report} 
          placeFn={this.place}
          placeInputFn={this.placeInputUpdate}
          placeInput={this.placeInput}
          batchCommandsFn={this.batchCommandsFn}
          batchFn={this.batchFn}
        />
      </div>
    );
  }
}

export default App;