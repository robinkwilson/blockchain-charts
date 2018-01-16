import React, { Component } from 'react';

import { numberWithCommasNoDecimals, numberWithCommasWithDecimals } from '../../utils/helpers.js'
export default class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      data: props.data,
      unit: props.unit
    }
  }

  render() {
    const { title, data, unit } = this.state;
    return (
      <div className="padding-1">
        <span className="no-p-m">{title}</span>
        <p className="no-p-m fnt-16">{ data.toString().indexOf('.') === -1 ? numberWithCommasNoDecimals(data) : numberWithCommasWithDecimals(data) }</p>
        <p className="fnt-12 no-p-m">{unit}</p>
      </div>
    );
  }
}