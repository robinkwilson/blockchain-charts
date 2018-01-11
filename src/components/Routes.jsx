import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../css/index.scss';

// Components
import ChartSandbox from './ChartSandbox.jsx';
import Charts from './Charts.jsx';
import SimpleNav from './SimpleNav.jsx';
import PageNotFound from './PageNotFound.jsx';

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