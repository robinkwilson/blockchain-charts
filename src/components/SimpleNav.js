import React, { Component } from 'react';

export default class SimpleNav extends Component {
  render() {
    return (
      <div className="container">
        <div className="flex-row">
          <button>Charts</button>
          <button>Chart Sandbox</button>
        </div>
      </div>);
  }
}