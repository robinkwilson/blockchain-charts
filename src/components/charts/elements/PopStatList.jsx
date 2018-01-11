import React, { Component } from 'react';

import { fetchBitcoinData, fetchWalletData } from '../../../utils/chartsapi.js';

export default class PopStatList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stats: null,
      BTCWallets: null,
    }
  }

  async componentDidMount() {
    console.log(fetchBitcoinData);

    fetchBitcoinData()
    .then(stats => this.setState({stats}));

    fetchWalletData()
    .then(BCWallets => this.setState({BCWallets}));

    // fetch('https://gentle-mesa-19770.herokuapp.com/https://api.blockchain.info/stats')
    //   .then(res => res.json())
    //   .then(data => this.setState({ data }))

  }

  render() {
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