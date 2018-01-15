import React, { Component } from 'react';

class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      data: props.data,
      unit: props.unit
    }
  }

  render() {
    const {title, data, unit} = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{data}</p>
        <p>{unit}</p>
      </div>
    );
  }
}

export default Stat;