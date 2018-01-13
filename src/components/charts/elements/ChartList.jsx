import React, { Component } from 'react';
import _ from 'lodash';

import Chart from './Chart.jsx';



export default class ChartList extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      filters: filters,
      activeFilters: [],
      chartLists: {
        // Property names are used section titles converted by categoryToTitle()
        currency_statistics: {
          charts: [
            // properties for each chart obj: title, sub, link, filters
            // link text is used in the chart page link and image name
            { title: 'Number of Bitcoins in Circulation', sub: '#(Total BTC) x Time', link: 'total-bitcoins', filters: ['BTC', '#(Total BTC)', 'Time'] },
            { title: 'BTC Market Price (USD)', sub: 'USD(1 BTC) x Time', link: 'market-price', filters: ['BTC', 'USD(1 BTC)', 'Time', '1 BTC'] },
            { title: 'USD of BTC in Circulation', sub: 'USD(Total BTC) x Time,', link: 'market-cap', filters: ['BTC', 'USD(Total BTC)', 'Time'] },
          ]
        },
        block_details: {
          charts: []
        },
        mining_information: {
          charts: []
        },
        network_activity: {
          charts: []
        },
        blockchain_wallet_activity: {
          charts: []
        }
      }
    }
    
  }
  
  // Event handler for Filter Button click event
  // Adds inactive button to active status and vice versa
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
    const { chartLists, activeFilters, filters } = this.state;
    const categories = Object.keys(chartLists); 
    return (
      <div>
        <div style={{ backgroundColor: '#392' }}>
          <h2>Filters</h2>
          <div className='flex-row'>
            {
              filters && filters.map((cur, id) => {
                return (
                  <button key={id} type="button" onClick={this.toggleFilter.bind(this, id)} className={cur.active ? "btn btn-primary focus active" : "btn btn-primary"} data-toggle="button" aria-pressed="false" autoComplete="off">
                    {cur.text}
                  </button>
                );
              })
            }
          </div>
        </div>

        {
          categories && categories.map((category, id) => {
            return (
              <div key={id} className="padding-1 pop-stat-container">
                <h2>{`${categoryToTitle(category)}`}</h2>
                <div className='flex-row'>
                  {
                    chartLists[category].charts && chartLists[category].charts.filter(chart => hasFilters(chart, activeFilters)).map((chart, id) => {
                      return <Chart key={id} chart={chart} />;
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div >
    );
  }
}

// List of possible filters for buttons
const filterList = ['BTC', '#(Total BTC)', 'Time', '1 BTC', 'Total BTC', 'USD(Total BTC)']
const filters = filterList.map(filterName => {
  return {
    text: filterName,
    active: false
  }
})

// converts this.state.chartList property names into section titles
// ex: 'currency_statistics' => 'Currency Statistics'
function categoryToTitle(name) {
  return name.split('_').map(str => str[0].toUpperCase() + str.slice(1)).join(' '); //
}

// true if all activeFilters elements are contained inside chart.filters
// true if activeFilters is empty 
function hasFilters(chart, activeFilters) {
  let active = activeFilters.map(filter => filter.text);
  if (activeFilters.length === 0) return true;
  else if (chart.filters) return _.difference(active, chart.filters).length === 0;
  else return false;
}
// 