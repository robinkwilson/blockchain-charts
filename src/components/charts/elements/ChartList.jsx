import React, { Component } from 'react';

import Chart from './Chart.jsx';

const filterList = ['#(Total BTC)', 'Time', '1 BTC', 'Total BTC', 'USD(Total BTC)']
const filters = filterList.map(filterName => {
  return {
    text: filterName,
    active: false
  }
})

function underscoreCategoryToCamelCaseTitle(name) {
  return name.split('_').map((str) => str.charAt(0).toUpperCase()).join(' ');
}

function hasFilters(chart, activeFilters) {
  if (chart.filters){
    return chart.filters.filter( () => {
      
    })
  } 
  return false;
}

export default class ChartList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filters: filters,
      activeFilters: [],
      chartLists: {
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
    }

  }

  toggleFilter(id, evt) {

    const cur_id = id;
    const cur_text = evt.target.innerText;
    const cur_isActive = evt.target.className.indexOf('active') !== -1;
    let cur = this.state.filters[cur_id];

    let active = this.state.activeFilters;
    let filters = this.state.filters;

    if (!cur_isActive) { // not active element
      //add to activeFilters array
      this.setState({ activeFilters: active.concat([{ text: evt.target.innerText, id: cur_id }]) });
    } else { // active element
      //remove from activeFilters array
      this.setState({ activeFilters: active.filter(item => item.text !== cur_text) })
    }

    // inside filters array toggle 'active' property
    cur.active = !cur_isActive;
    filters.splice(cur_id, 1, cur);
    this.setState({ filters: filters });
  }

  render() {
    const chartLists = this.state;
    return (
      <div>
        <div style={{ backgroundColor: '#392' }}>
          <h2>Filters</h2>
          {
            this.state.filters && this.state.filters.map((cur, id) => {
              return (
                <button key={id} type="button" onClick={this.toggleFilter.bind(this, id)} className={cur.active ? "btn btn-primary focus active" : "btn btn-primary"} data-toggle="button" aria-pressed="false" autoComplete="off">
                  {cur.text}
                </button>
              );
            })
          }
        </div>

        {
          chartLists && chartLists.map(category => {
            return (
              <div className="padding-1 pop-stat-container">
                <h2>{`${underscoreCategoryToCamelCaseTitle(category)}`}</h2>
                {
                  category.charts.filter(chart => {})
                }
              </div>
            );

          })
        }
        

          <div className="card">

          </div>
        </div>
      </div>
    );
  }
}