import React, { Component } from 'react';

import ChartList from './elements/ChartList.jsx';
import PopStatList from './elements/PopStatList.jsx';

export default class Charts extends Component {
  render() {
    return (
      <div className="container">
        <PopStatList />
        <ChartList />
      </div>
    );
  }
}