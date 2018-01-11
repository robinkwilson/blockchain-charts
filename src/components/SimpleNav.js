import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SimpleNav extends Component {
  render() {
    return (
      <div className="container">
        <div className="flex-row">
          <Link to='/'><button>Charts</button></Link>
          <Link to='/chartsandbox'><button>Chart Sandbox</button></Link>
        </div>
      </div>);
  }
}