import React, { Component } from 'react';

export default class ChartTile extends Component {
  render() {
    const { title, sub, link } = this.props.chart;
    console.log(title);
    return (
      <div className="card col-sm-6 col-md-4 col-lg-4 padding-1 center">  
        <p className="fnt-md">{`${title}`}</p>
        <p className="fnt-sm padding-xsm">{`${sub}`}</p>
        <div>
          <div className="parent-h-w">
            <img src={`../../../../public/img/${link}.png`} />
          </div>
        </div>
      </div>
    );
  }
}