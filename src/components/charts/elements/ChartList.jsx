import React, { Component } from 'react';

export default class ChartList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filters: [{ text: '#(Total BTC)', active: false }, 'Time', '1 BTC', 'Total BTC', 'USD(Total BTC)'],
      activeFilters: [],
      currency_statistics: {
        charts: [
          { title: 'Number of Bitcoins in Circulation', sub: '#(Total BTC) x Time', link: 'total-bitcoins', filters: ['#(Total BTC)', 'Time'] },
          { title: 'BTC Market Price (USD)', sub: 'USD(1 BTC) x Time', link: 'market-price', filters: ['USD(1 BTC)', 'Time'] },
          { title: 'USD of BTC in Circulation', sub: 'USD(Total BTC) x Time,', link: 'market-cap', filters: ['USD(Total BTC)', 'Time'] },
        ]
      },
      block_details: {

      },
      mining_information: {

      },
      network_activity: {

      },
      blockchain_wallet_activity: {

      }
    }

    []

    this.toggle = this.bind(toggle);
  }

  toggle(evt) {
    evt.preventDefault();

    
  }

  render() {
    return (
      <div style={{ backgroundColor: '#392' }}>
        <h2>Filters</h2>
        {
          this.state.filters && this.state.filters.map((filter, id) => {
            return (
              <button key={id} type="button" className={filter.active ? "btn btn-primary focus active" : "btn btn-primary"} data-toggle="button" aria-pressed="false" autoComplete="off">
                {filter.text}
              </button>
            );
          })
        }
      </div>
    );
  }
}