import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import ChartTile from './ChartTile.jsx';
import FilterList from './FilterList.jsx';
import CategoriesList from './CategoriesList.jsx';

export class ChartList extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  render() {
    const { chartLists } = this.state;
    const categories = Object.keys(chartLists);
    return (
      <div>
        <FilterList />
        <CategoriesList categories={categories} chartLists={chartLists} />
      </div >
    );
  }
}

const mapState = (state) => {
  return {
    activeFilters: state.activeFilters,
    filters: state.filters
  };
};

const mapDispatch = (dispatch) => {
  return {
    addActiveFilter: (filter) => { dispatch(addActiveFilter(filter)) },
    deleteActiveFilter: (filter) => { dispatch(addActiveFilter(filter)) }
  };
};

export default connect(mapState, mapDispatch)(ChartList);
