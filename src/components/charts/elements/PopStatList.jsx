import React, { Component } from 'react';

import { fetchBitcoinData, fetchWalletData } from '../../../utils/chartsapi.js';

const helpers = {
  calculateSubtext:
    function (stat, perUnit, unitTxt, subTxt) {
      return subTxt + this.calculatePerUnit(stat, perUnit) + unitTxt + 's';
    },
  calculatePerUnit:
    function (stat, perUnit) {
      return stat/perUnit;
    }
}

const comparisons = {
  market_price_usd: {
    unitTxt: 'latte', // should change for popular unit between country (ex-China would say price of x street food)
    perUnit: 5, // 1 latte for $5
    subtext: '1 BTC can purchase',
    image: ''
  },
  my_wallet_n_users: {
    text: 'Trusted for the highest security and for our easy to use wallet application.' // if text, do not use the graphs
  }
}

const printedStats = [
  {
    title: 'BTC Market Price (USD)',
    statUnit: 'USD',
    query: {
      dataType: 'stat', // stat fetches blockchain.info/stats, chart fetches blockchain.info/charts + query data
      propName: 'market_price_usd'
    }
  },
  {
    title: 'Blockchain Wallet Users',
    statUnit: 'users',
    query: {
      dataType: 'chart', // stat => blockchain.info/stats || chart => blockchain.info/charts + query data
      propName: 'my-wallet-n-users'
    }
  }
]

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
      .then(stats => this.setState({ stats }));

    fetchWalletData()
      .then(BCWallets => this.setState({ BCWallets }));

    // fetch('https://gentle-mesa-19770.herokuapp.com/https://api.blockchain.info/stats')
    //   .then(res => res.json())
    //   .then(data => this.setState({ data }))

  }

  render() {
    return (
      <div className="col-12">
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