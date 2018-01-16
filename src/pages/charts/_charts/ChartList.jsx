import React, { Component } from 'react';
import _ from 'lodash';

import ChartTile from './ChartTile.jsx';
import FilterList from './FilterList.jsx';

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
            { title: 'Number of Bitcoins in Circulation', sub: '#(Total BTC) x Time', link: 'total-bitcoins', filters: ['BTC', 'Total BTC', '#', 'Time'] },
            { title: 'BTC Market Price (USD)', sub: 'USD(1 BTC) x Time', link: 'market-price', filters: ['BTC', 'USD', 'Time', 'Per BTC'] },
            { title: 'USD of BTC in Circulation', sub: 'USD(Total BTC) x Time,', link: 'market-cap', filters: ['BTC', 'Total BTC', 'USD', 'Time'] },
          ]
        },
        block_details: {
          charts: [
            { title: 'Blockchain Size (MB)', sub: 'MB(Total Blocks) x Time', link: 'blocks-size', filters: ['MB', 'Time', 'Total Blocks', 'Block'] },
            { title: 'Average Block Size (MB)', sub: 'MB(1 Block) x Time', link: 'avg-block-size', filters: ['MB', 'Time', 'Per Block', 'Block'] },
            { title: 'Number of Orphaned Blocks', sub: '#(Total Blocks) x Time', link: 'n-orphaned-blocks', filters: ['#(Total Blocks)', '#', 'Block', 'Time'] },
            { title: 'Transactions per Block', sub: 'Avg #(Transactions/Block) x Time', link: 'n-transactions-per-block', filters: ['Avg', 'Transactions/Block', 'Per Block', '#', 'Time'] },
            { title: 'Median Transaction Confirmation Time (with fee)', sub: 'Avg(Time) x Time', link: 'median-confirmation-time', filters: ['Avg', 'Time'] },
          ]
        }
      }
    }
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  // Event handler for Filter Button click event
  // Adds inactive button to active status and vice versa
  toggleFilter(evt, id) {
    console.log('toggle arguments', evt, id);

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

    // inside state filters array toggle 'active' property
    cur.active = !cur_isActive;
    filters.splice(cur_id, 1, cur);
    this.setState({ filters: filters });
  }

  render() {
    const { chartLists, activeFilters, filters } = this.state;
    const categories = Object.keys(chartLists);
    return (
      <div>
        <FilterList filters={filters} onClick={this.toggleFilter}/>
        {
          categories && categories.map((category, id) => {
            return (
              <div key={id} className="padding-1 charts">
                <h2>{`${categoryToTitle(category)}`}</h2>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#${category}`} aria-expanded="false" aria-controls={category}>
                  Collapse
                </button>
                <div id={category}>
                  <div className='flex-row container'>
                    {
                      chartLists[category].charts && chartLists[category].charts.filter(chart => hasFilters(chart, activeFilters)).map((chart, id) => {
                        return <ChartTile key={id} chart={chart} />;
                      })
                    }
                  </div>
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
const filterList = ['BTC', 'USD', 'Avg', '#', 'MB', 'Time', 'Per BTC', 'Total BTC', 'Total Blocks', 'Per Block', 'Block']
// initialize the filters objects
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