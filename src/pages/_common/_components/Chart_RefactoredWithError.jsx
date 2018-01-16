import React, { Component } from 'react';
import ChartJS from 'react-chartjs-2';
import moment from 'moment';

import { fetchChartData } from '../';
import { numberWithCommasNoDecimals } from '../';

class Chart extends Component {

  constructor(props) {
    super(props);

    console.log(this.state);
    this.state = {
      chartDataSets:
        [
          {
            label: 'Estimated Transaction Value (USD)',
            query: 'estimated-transaction-volume-usd',
            data: [],
            borderColor: 'rgba(75,192,192,1)',
            pointRadius: 0.1,
            fill: false
          },
          {
            label: 'Miners Revenue (Transaction Fee and Coinbase Block Rewards',
            query: 'miners-revenue',
            data: [],
            pointRadius: 0.1,
            borderColor: 'rgba(80,0,192,1)',
            fill: false
          }
        ],
      options: {},
      hidden: false //if loading data fails chart is hidden from view
    }
  }

  async componentDidMount() {
    const appendTxt = '?timespan=6months&format=json';
    const { chartDataSets } = this.state;
    const query_arr = chartDataSets.map(cur => fetchChartData(cur.query, appendTxt));

    // NOTE FOR FEEDBACK: If using specific names for each fetch query was better as my original, 
    //    please let me know !!
    // const q_transVal = fetchChartData(transactionValue.query, '?timespan=6months&format=json');
    // const q_minersRev = fetchChartData(minersRevenue.query, '?timespan=6months&format=json');

    Promise.all(query_arr)
      .then(data_arr => {

        // add data points into dataSet then setState
        const new_dataSet = chartDataSets.map((cur, index) => {
          //console.log('before', cur, data_arr[index]);
          cur.data = data_arr[index].values;
          delete cur.query;
          console.log('after', cur);
          return cur;
        });
        //console.log('Setting State to ', new_dataSet);

        this.setState({ chartDataSets: new_dataSet, hidden: false });

      }).catch(err => {
        console.error(err);
        this.setState({ hidden: true });
      });
  }

  render() {
    const { options, chartDataSets, hidden } = this.state;
    console.log('state is is', this.state);
    console.log('Datasets is ', chartDataSets)

    const data2 = {
      datasets: [
        {
          label: 'Estimated Transaction Value (USD)',
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0.1,
          data: chartdata.transactionValue ? data.transactionValue : [],
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

    return (
      <div className={hidden ? 'chart-container hidden' : 'chart-container'} >
        <ChartJS data={{ datasets: chartDataSets }} options={options} width={600} height={250} type='line' />
      </div>
    );
  }
}

export default Chart;


const options = {
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
        const value = tooltipItem.yLabel;
        return '$ ' + numberWithCommasNoDecimals(value);
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
          labelString: 'Value'
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