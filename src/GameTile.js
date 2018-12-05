import React, { Component } from 'react';

class GameTile extends Component {
  render() {
    var isActiveClass = this.props.active === true ? 'is-active': '';
    return (
      <div 
        className={`tile ${isActiveClass}`}
        data-x={this.props.x}
        data-y={this.props.y}
        data-direction={this.props.direction}
      />
    );
  }
}

export default GameTile;
