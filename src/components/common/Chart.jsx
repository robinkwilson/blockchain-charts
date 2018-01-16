import React, { Component } from 'react';
import ChartJS from 'react-chartjs-2';

export default class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      options: props.options,
      type: props.type
    }
  }

  render() {
    const { options, data, type } = this.state;
    return <ChartJS data={data} options={options} type={type} />;
  }
}