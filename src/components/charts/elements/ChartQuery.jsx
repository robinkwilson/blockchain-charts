import React, { Component } from 'react';
import ChartJS from 'react-chartjs-2';
import moment from 'moment';

//import { Chart } from '../../common';
import { fetchChartData } from '../../../utils/chartsapi.js';
import { numberWithCommasNoDecimals } from '../../../utils/helpers.js';

export default class ChartQuery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryData: {},
      hidden: false   //if loading data fails chart is hidden from view
    }
  }

  async componentDidMount() {
    const q_transVal = fetchChartData('estimated-transaction-volume-usd', '?timespan=6months&format=json');
    const q_minersRev = fetchChartData('miners-revenue', '?timespan=6months&format=json');

    Promise.all([q_transVal, q_minersRev])
      .then(([data_transVal, data_minersRev]) => {
        this.setState({
          queryData: {
            transactionValue: data_transVal.values,
            minersRevenue: data_minersRev.values
          },
          hidden: false
        });
      }).catch(err => {
        console.error(err);
        this.setState({ hidden: true });
      });
  }

  render() {
    const { hidden, queryData } = this.state;
    const chartData = {
      datasets: [
        {
          label: 'Estimated Transaction Value (USD)',
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0.1,
          data: queryData.transactionValue ? queryData.transactionValue : [],
        },
        {
          label: 'Miners Revenue (USD)',
          fill: false,
          borderColor: 'rgba(80,0,192,1)',
          pointRadius: 0.1,
          data: queryData.minersRevenue ? queryData.minersRevenue : [],
        }
      ]
    };

    console.log(chartData);
    return (
      <div className={hidden ? 'col-sm-12 hidden' : 'col-sm-12'} >
        <ChartJS data={chartData} options={opts} type='line' />
      </div>
    );
  }
}

const opts = {
  hover: {
    intersect: false,
  },
  title: {
    display: true,
    text: 'Transaction Value vs Miners Revenue'
  },
  legend: {
    position: 'bottom'
  },
  responsive: true,
  tooltips: {
    mode: 'x',
    callbacks: {
      title: (tooltipItem) => {
        return moment.unix(tooltipItem[0].xLabel).format("MM/DD/YYYY")
      },
      label: (tooltipItem) => {
        return '$ ' + numberWithCommasNoDecimals(tooltipItem.yLabel);
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
              return '$ ' + numberWithCommasNoDecimals(value);
            }
          }
      }
    ]
  },
}