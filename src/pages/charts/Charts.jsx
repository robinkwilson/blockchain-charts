import React, { Component } from 'react';

import ChartList from './_charts/ChartList.jsx';
import PopStatList from './_popstats/PopStatList.jsx';
import Heading from '../_common';

export default function Charts() {
  console.log(ChartList, PopStatList, Heading);
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