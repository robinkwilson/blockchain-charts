import React, { Component } from 'react';
import ChartJS from 'react-chartjs-2';
import moment from 'moment';

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
        datasets: [chartData.transactionValue]
      },
      options: {
        scales: {
          ticks: {
            source: 'auto'
          },
          xAxes: [{
            type: 'time',
            ticks: {
              source: 'auto',
              display: true,
              labelString: 'Test'
            },
            time: {
              //unit: 'month',
              displayFormats: {
                month: 'MMM YYYY'
              },
              //parser: (time) => moment.unix(time)
            },
            distribution: 'series'
          }],
        }
      }
    });
  }

  render() {
    const { options, data, hidden } = this.state;
    const data2 = {
      //labels: [1484438400, 1492905600, 1510272000, 1515801600],
      datasets: [
        {
          label: 'Chart Data',
          fill: false,
          // lineTension: 0.5,
          // backgroundColor: 'rgba(75,192,192,0.4)',
          // borderColor: 'rgba(75,192,192,1)',
          // borderCapStyle: 'butt',
          // borderDash: [],
          // pointRadius: 0,
          // borderDashOffset: 0.0,
          // borderJoinStyle: 'miter',
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          // pointBorderWidth: 1,
          // pointHoverRadius: 5,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          // pointHoverBorderColor: 'rgba(220,220,220,1)',
          // pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          //  pointHitRadius: 10,
          data: data.datasets ? data.datasets[0].data : [],
        }
      ]
    };
    console.log('data', data.datasets ? data.datasets[0].data : []);

    const opts = {
      title: {
        text: "Chart.js Time Scale"
      },
      scales: {
        xAxes: [{
          distribution: 'linear',
          type: "time",
          time: {
            parser: (time) => moment.unix(time),
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        },],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Value (in Millions)'
          },
          ticks:
            {
              callback: function (value, index, values) {
                const roundToTenThous = Math.round(100000 * value)/100000;
                const stringify = roundToTenThous.toString();
                const roundToMil = stringify.slice(0, stringify.length - 6);
                //const addComma = roundToMil.slice(0, 1) + ',' + roundToMil.slice(1, 4); //+ '.' + roundToMil.slice(4, roundToMil.length);
                return '$' + roundToMil + 'M';
              }
            }
        }]
      },
    }
    const dt = {

    }
    //console.log('options',options);
    //console.log('hidden', hidden);
    return (
      <div className={'chart-container' + hidden ? ' hidden' : ''} >
        <ChartJS data={data2} options={opts} width={600} height={250} type='line' />
      </div>
    );
  }
}

export default Chart;