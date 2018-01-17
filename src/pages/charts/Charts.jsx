import React, { Component } from 'react';

import ChartList from './_chartlist/ChartList.jsx';
import PopStats from './_popstats/PopStats.jsx';
import { Heading } from '../_common';
import CallToAction from './CallToAction.jsx';

export default function Charts() {
  return (
    <div>
      <Heading title={'Blockchain Charts'} subtext={'The most trusted source for data on the bitcoin blockchain.'} />
      <div className="sticky-menu"></div>
      <div className="center">
        <PopStats />
        <ChartList />
      </div>
      <CallToAction />
      <div className="sticky-menu footer" height="500px"></div>
    </div>
  );
}