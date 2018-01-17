import React, { Component } from 'react';
import ChartJS from 'react-chartjs-2';
import moment from 'moment';

import {
  numberWithCommasNoDecimals,
  fetchChartData,
  roundToMillions
} from '../../_common';

export default class ChartQuery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryData: {},
      hidden: true   //if loading data fails chart is hidden from view
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
          label: '[ X ] Estimated Transaction Value (USD)',
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0.2,
          data: queryData.transactionValue ? queryData.transactionValue : [],
        },
        {
          label: '[ X ] Miners Revenue (USD)',
          fill: false,
          borderColor: 'rgba(80,0,192,1)',
          pointRadius: 0.2,
          data: queryData.minersRevenue ? queryData.minersRevenue : [],
        }
      ]
    };

    return (
      <div id="pop-chart" className={hidden ? 'hidden' : 'parent-h-w'} >
        <ChartJS data={chartData} options={options} type='line' />
      </div>
    );
  }
}

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
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
            callback: (value, index, values) => {
              const rounded = roundToMillions(value);
              const commas = numberWithCommasNoDecimals(rounded);
              return '$ ' + commas + 'M';
            }
          }
      }
    ]
  },
}