import React, { Component } from 'react';

import ChartList from './_charts/ChartList.jsx';
import PopStats from './_popstats/PopStats.jsx';
import { Heading } from '../_common';

export default function Charts() {
  return (
    <div>
      <Heading title={'Blockchain Charts'} subtext={'The most trusted source for data on the bitcoin blockchain.'} />
      <div className="sticky-menu"></div>
      <div className="center">
        <PopStats />
        <ChartList />
      </div>
    </div>
  );
}