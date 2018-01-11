import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SimpleNav extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <div className="flex-row">
            <Link to='/'><button className='btn'>Charts</button></Link>
            <Link to='/chartsandbox'><button className='btn'>Chart Sandbox</button></Link>
          </div>
        </div>
      </div>);
  }
}