import React, { Component } from 'react';
import ChartJS from 'react-chartjs-2';

import { fetchChartData } from '../../utils/chartsapi.js';

const chartData = {
  transactionValue: {
    label: 'Estimated Transaction Value (USD)',
    query: 'estimated-transaction-volume-usd',
    data: [],
    borderColor: '#000',
    fill: false
  },
  minersRevenue: {
    label: 'Miners Revenue (Transaction Fee and Coinbase Block Rewards',
    query: 'miners-revenue',
    data: [],
    borderColor: '#444',
    fill: false
  },
  transactionFees: {
    label: 'Transaction Fees (USD)',
    query: 'transaction-fees-usd',
    data: [],
    borderColor: '#555',
    fill: false
  }
};


class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      options: {},
      hidden: false //if loading data fails chart is hidden from view
    }
  }

  async componentDidMount() {
    let hidden = true;
    const q_transVal = fetchChartData(chartData.transactionValue.query);
    const q_minersRev = fetchChartData(chartData.minersRevenue.query);
    const q_transFees = fetchChartData(chartData.transactionFees.query);

    Promise.all([q_transVal, q_minersRev, q_transFees])
      .then(([data_transVal, data_minersRev, data_transFees]) => {
        chartData.transactionValue.data = data_transVal.values;
        chartData.minersRevenue.data = data_minersRev.values;
        chartData.transactionFees.data = data_transFees.values;
        hidden = false;
      }).catch(err => {
        console.error(err);
        this.setState({ hidden });
      });

    if (hidden === false) {

    }
    this.setState({
      data: {
        datasets: [ chartData.transactionValue ]
      },
      options: {
        elements: {
          line: {
            tension: 0, // disables bezier curves
          }
        }
      }
    });
  }

  render() {
    const { options, data, hidden } = this.state;
    return (
      <div className={'chart-container' + hidden ? ' hidden' : ''}>
        <ChartJS data={data} options={options} width={600} height={250} />
      </div>
    );
  }
}

export default Chart;