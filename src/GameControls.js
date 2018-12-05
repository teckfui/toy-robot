import React, { Component } from 'react';

class GameControls extends Component {
  render() {
    return (
      <div className="controls">
        <input type="text" defaultValue={this.props.placeInput} onKeyUp={this.props.placeInputFn} />
        <button onClick={this.props.placeFn}>Place</button>
        <button onClick={this.props.moveFn}>Move</button>
        <button onClick={this.props.turnLeftFn}>Left</button>
        <button onClick={this.props.turnRightFn}>Right</button>
        <button onClick={this.props.reportFn}>Report</button><br />
        <textarea placeholder="Batch Commands" onKeyUp={this.props.batchCommandsFn}></textarea>
        <button onClick={this.props.batchFn}>Execute</button>
      </div>
    );
  }
}

export default GameControls;
