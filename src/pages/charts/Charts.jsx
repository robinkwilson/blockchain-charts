import React, { Component } from 'react';

import ChartList from './_charts/ChartList.jsx';
import PopStatList from './_popstats/PopStatList.jsx';
import Heading from '../common';

export default class Charts extends Component {
  render() {
    return (
      <div>
        <Heading title={'Blockchain Charts'} subtext={'The most trusted source for data on the bitcoin blockchain.'} />
        <div className="sticky-menu"></div>
        <div className="center">
          <PopStatList />
          <ChartList />
        </div>

      </div>
    );
  }
}