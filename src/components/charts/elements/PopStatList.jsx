import React, { Component } from 'react';

import { bitcoinData } from '../../../utils/chartsapi.js';

export default class PopStatList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  async componentDidMount() {
    // const {} = bitcoinData();
    // console.log(bitcoinData);
    // const data = await bitcoinData();
    // this.setState({ data });

    fetch('https://gentle-mesa-19770.herokuapp.com/https://api.blockchain.info/stats')
      .then((res) => {
        console.log(res.json);
        console.log(res);
        return res.json();
      })
      .then((data) => this.setState({ data }))
  }

  render() {
    console.log(this.state.data);
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