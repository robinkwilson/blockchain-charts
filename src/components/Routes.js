import React, { Component } from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import ChartSandbox from './ChartSandbox';
import Charts from './Charts';

export default class Routes extends Component {
  render() {
    return
    <Router history=''>
      <Switch>
        <Route path="/chartsandbox" component={ChartSandbox} />
        <Route path="/" component={Charts} />
      </Switch>
    </Router>
  }
}