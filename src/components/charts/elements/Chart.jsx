import React, { Component } from 'react';

export default class Chart extends Component {
  render() {
    const {title, sub, link} = this.props.chart;
    console.log(title);
    return (
      <div className="card">
        <p>{`${title}`}</p>
        <p>{`${sub}`}</p>
        <img src={`../../../../public/img/${link}.png`} width="100px" height="100px" />
      </div>
    );
  }
}