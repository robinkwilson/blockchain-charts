import React, { Component } from 'react';

import ChartList from './elements/ChartList.jsx';
import PopStatList from './elements/PopStatList.jsx';

export default class Charts extends Component {
  render() {
    return (
      <div>
        <div className="padding-1">
          <h2>Blockchain Charts</h2>
        </div>
        <p className="text-center">The most trusted source for data on the bitcoin blockchain.</p>
        <div className="sticky-menu"></div>

        <PopStatList />
        <ChartList />
        
      </div>
    );
  }
}