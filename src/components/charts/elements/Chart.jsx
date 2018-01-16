import React, { Component } from 'react';

export default class Chart extends Component {
  render() {
    const { title, sub, link } = this.props.chart;
    console.log(title);
    return (
      <div className="card col-sm-6 col-md-3 col-lg-3 padding-1">  
        <p className="fnt-md center">{`${title}`}</p>
        <p className="fnt-xsm center">{`${sub}`}</p>
        <div>
          <div className="parent-h-w">
            <img src={`../../../../public/img/${link}.png`} />
          </div>
        </div>
      </div>
    );
  }
}