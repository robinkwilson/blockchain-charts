import React, { Component } from 'react';

import ChartQuery from './ChartQuery.jsx';
import { 
  Stat, 
  fetchBitcoinData, 
  fetchChartData 
} from '../../_common';

export default class PopStatList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      printedStats: [
        {
          title: 'BTC Market Price (USD)',
          unit: 'USD',
          statName: 'market_price_usd',
          data: null,
          hidden: true,
          sign: '$'
        },
        {
          title: 'Avg Block Size',
          unit: 'Bytes',
          statName: 'blocks_size',
          data: null,
          hidden: true
        },
        {
          title: 'Confirmed Transactions in Last 24 hours',
          unit: 'Transactions',
          statName: 'n_tx',
          data: null,
          hidden: true
        }
      ]
    };
  }

  async componentDidMount() {
    const { printedStats } = this.state;

    fetchBitcoinData()
      .then(data => {
        let dataAdded = printedStats.map(cur => {
          cur.data = data[cur.statName];
          if (cur.data) cur.hidden = false; // data isn't null or undefined
          return cur;
        });
        this.setState({ stats: dataAdded });
      })
      .catch(err => {
        return null;
      });
  }

  render() {
    const { printedStats } = this.state;
    return (
      <div className="container">
        <div className="row padding-1">
          <div className="center col-sm-12 col-md-3 col-lg-4">
            {
              printedStats.map((cur, index) => {
                return (
                  cur.hidden === false
                    ? <Stat
                      key={index}
                      title={cur.title}
                      data={cur.data ? cur.data : null}
                      unit={cur.unit}
                      sign={cur.sign ? cur.sign : ''} />
                    : ''
                )
              })
            }
          </div>
          <div className="col-sm-12 col-md-9 col-lg-8 padding-sm">
            <ChartQuery />
          </div>
        </div>
      </div>
    );
  }
}