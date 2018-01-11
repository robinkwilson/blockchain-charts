import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './common';

export default class SimpleNav extends Component {
  render() {
    console.log(Button);
    return (
      <div className="navbar">
        <div className="container">
          <div className="flex-row">
            <Button linkto={'/'} classes={'btn'} txt={'Charts'} />
            <Button linkto={'/chartsandbox'} classes={'btn'} txt={'Chart Sandbox'} />
          </div>
        </div>
      </div>);
  }
}