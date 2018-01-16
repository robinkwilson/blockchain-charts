import React, { Component } from 'react';

import ChartList from './elements/ChartList.jsx';
import PopStatList from './elements/PopStatList.jsx';

export default class Charts extends Component {
  render() {
    return (
      <div>
        <div className="padding-1 center">
          <div className="padding-sm">
            <h2>Blockchain Charts</h2>
          </div>
          <p className="padding-sm">The most trusted source for data on the bitcoin blockchain.</p>

        </div>
        <div className="sticky-menu"></div>
        <div className="center">
          <PopStatList />
          <ChartList />
        </div>

      </div>
    );
  }
}