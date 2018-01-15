import React, { Component } from 'react';
import ChartJS from 'react-chartjs-2';
import moment from 'moment';

import { fetchChartData } from '../../utils/chartsapi.js';

let transactionValue = {
  label: 'Estimated Transaction Value (USD)',
  query: 'estimated-transaction-volume-usd',
  data: [],
  borderColor: '#000',
  fill: false
};
let minersRevenue = {
  label: 'Miners Revenue (Transaction Fee and Coinbase Block Rewards',
  query: 'miners-revenue',
  data: [],
  borderColor: '#444',
  fill: false
};

// TODO
function roundDataPointToMil(num) {
  let rounded = num;
  const roundToTenThous = Math.round(100000 * value) / 100000;
  const stringify = roundToTenThous.toString();
  const roundToMil = stringify.slice(0, stringify.length - 6);
  return num;
}


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
    const q_transVal = fetchChartData(transactionValue.query, '?timespan=6months&format=json');
    const q_minersRev = fetchChartData(minersRevenue.query, '?timespan=6months&format=json');

    Promise.all([q_transVal, q_minersRev])
      .then(([data_transVal, data_minersRev]) => {
        transactionValue.data = data_transVal.values;
        minersRevenue.data = data_minersRev.values;

        this.setState({
          data: {
            transactionValue: transactionValue.data,
            minersRevenue: minersRevenue.data
          },
          hidden: false
        });
      }).catch(err => {
        console.error(err);
        this.setState({ hidden: true });
      });
  }

  render() {
    const { options, data, hidden } = this.state;
    const data2 = {
      datasets: [
        {
          label: 'Estimated Transaction Value (USD)',
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0.1,
          data: data.transactionValue ? data.transactionValue : [],
        },
        {
          label: 'Miners Revenue (USD)',
          fill: false,
          borderColor: 'rgba(80,0,192,1)',
          pointRadius: 0.1,
          data: data.minersRevenue ? data.minersRevenue : [],
        }
      ]
    };

    const opts = {
      title: {
        display: true,
        text: 'Transaction Value vs Miners Revenue'
      },
      legend: {
        position: 'bottom'
      },
      responsive: true,
      //maintainAspectRatio: false,
      tooltips: {
        mode: 'label',
        callbacks: {
          title: (tooltipItem) => {
            return moment.unix(tooltipItem[0].xLabel).format("MM/DD/YYYY")
          },
          label: (tooltipItem) => {
            const value = tooltipItem.yLabel;
            const roundToTenThous = Math.round(100000 * value) / 100000;
            const stringify = roundToTenThous.toString();
            const roundToMil = stringify.slice(0, stringify.length - 6);
            return '$ ' + roundToMil + ' B';
          }
        }
      },
      scales: {
        xAxes: [
          {
            distribution: 'linear',
            type: "time",
            time: {
              parser: (time) => moment.unix(time),
              displayFormats: {
                'month': 'MMM YYYY',
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Value (in Millions)'
            },
            ticks:
              {
                callback: function (value, index, values) {
                  const roundToTenThous = Math.round(10000000 * value) / 10000000;
                  const stringify = roundToTenThous.toString();
                  const roundToMil = stringify.slice(0, stringify.length - 6);
                  //const addComma = roundToMil.slice(0, 1) + ',' + roundToMil.slice(1, 4); //+ '.' + roundToMil.slice(4, roundToMil.length);
                  return '$ ' + roundToMil + 'M';
                }
              }
          }
        ]
      },
    }
    const dt = {

    }
    return (
      <div className={hidden ? 'chart-container hidden' : 'chart-container'} >
        <ChartJS data={data2} options={opts} width={600} height={250} type='line' />
      </div>
    );
  }
}

export default Chart;