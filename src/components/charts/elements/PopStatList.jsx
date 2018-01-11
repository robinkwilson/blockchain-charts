import React, { Component } from 'react';

import bitcoinData from '../../../utils/chartsapi.js';

export default class PopStatList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    // const {} = bitcoinData();
    const data = bitcoinData();
    this.setState({ data });
  }
  
  render() {
    console.log(data);
    return (
      <div>
        <h2>Popular Statistics</h2>
        <p className="text-center">The most trusted source for data on the bitcoin blockchain.</p>

        {
          this.state.data 
          ? <p>We have data</p>
          : <p>We have no data :(</p>
        }
      </div>
    );
  }
}