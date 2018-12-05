import React, { Component } from 'react';
import _ from 'lodash';
import GameTile from './GameTile';

class GameBoard extends Component {
  render() {
    var cols = _.range(0, this.props.cols);
    var rows = _.range(this.props.rows - 1, -1);

    //build board
    var tiles = _.flatten(rows.map((row) => {
      return cols.map((col) => {
        return (<GameTile
          x={col}
          y={row}
          direction={this.props.direction}
          active={col === this.props.locationX && row === this.props.locationY}
        />);
      });
    }));

    return (
      <div className={`board col-${this.props.cols}`}>{tiles}</div>
    );
  }
}

export default GameBoard;
