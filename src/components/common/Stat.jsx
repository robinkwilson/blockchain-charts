import React, { Component } from 'react';

import { numberWithCommasNoDecimals, numberWithCommasWithDecimals } from '../../utils/helpers.js'
export default class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      data: props.data,
      unit: props.unit,
      sign: props.sign
    }
  }

  render() {
    const { title, data, unit, sign} = this.state;
    return (
      <div className="padding-sm">
        <span className="no-p-m fnt-md">{title}</span>
        <p className="fnt-lg padding-xsm">{ sign + (data.toString().indexOf('.') === -1 ? numberWithCommasNoDecimals(data) : numberWithCommasWithDecimals(data)) }</p>
        <p className="fnt-sm no-p-m">{unit}</p>
      </div>
    );
  }
}