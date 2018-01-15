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
let transactionFees = {
  label: 'Transaction Fees (USD)',
  query: 'transaction-fees-usd',
  data: [],
  borderColor: '#555',
  fill: false
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
    const q_transVal = fetchChartData(transactionValue.query);
    const q_minersRev = fetchChartData(minersRevenue.query);
    const q_transFees = fetchChartData(transactionFees.query);

    Promise.all([q_transVal, q_minersRev, q_transFees])
      .then(([data_transVal, data_minersRev, data_transFees]) => {
        transactionValue.data = data_transVal.values;
        minersRevenue.data = data_minersRev.values;
        transactionFees.data = data_transFees.values;

        console.log("data loaded", data_transVal.values);
        hidden = false;
        this.setState({
          data: {
            transactionValue: transactionValue.data,
            minersRevenue: minersRevenue.data
          },
        });
      }).catch(err => {
        console.error(err);
        this.setState({ hidden });
      });
  }

  render() {
    const { options, data, hidden } = this.state;
    const data2 = {
      //labels: [1484438400, 1492905600, 1510272000, 1515801600],
      datasets: [
        {
          label: 'Estimated Transaction Value (USD)',
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          pointRadius: 0.1,
          data: data.transactionValue ? data.transactionValue : [],
        },
        {
          label: 'Miners Revenue',
          fill: false,
          borderColor: 'rgba(80,0,192,1)',
          pointRadius: 0.1,
          data: data.minersRevenue ? data.minersRevenue : [],
        }
      ]
    };
    console.log('data', data.transactionValue ? data.transactionValue : []);
    console.log('data', data);

    const opts = {
      title: {
        text: "Chart.js Time Scale"
      },
      multiTooltipTemplate: "<%= value + ' %' %>",
      tooltips: {
        mode: 'label',
        callbacks: {
          label: (tooltipItem) => {
            console.log('tooooltipsss', tooltipItem);
            const value = tooltipItem.yLabel;
            const roundToTenThous = Math.round(100000 * value) / 100000;
            const stringify = roundToTenThous.toString();
            const roundToMil = stringify.slice(0, stringify.length - 9);
            //const addComma = roundToMil.slice(0, 1) + ',' + roundToMil.slice(1, 4); //+ '.' + roundToMil.slice(4, roundToMil.length);
            //return '$' + roundToMil + 'M';

             
            return '$' + roundToMil + 'B ' + moment.unix(tooltipItem.xLabel).format("MM/DD/YYYY");
          } /* called for each label item. return a string here that you want displayed */
        }
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
                const roundToTenThous = Math.round(100000 * value) / 100000;
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