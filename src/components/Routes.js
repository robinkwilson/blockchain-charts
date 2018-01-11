import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../css/index.scss';

// Components
import ChartSandbox from './ChartSandbox';
import Charts from './Charts';
import SimpleNav from './SimpleNav';
import PageNotFound from './PageNotFound';

export default class Routes extends Component {
  render() {
    //console.log(ChartSandbox, PageNotFound, Router, Route)
    return (
      <Router>
        <div>
          <SimpleNav />
          <Switch>
            <Route path='/chartsandbox' component={ChartSandbox} />
            <Route path='/' component={Charts} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}