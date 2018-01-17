import React from 'react';
import { connect } from 'react-redux';

import { hasFilters } from '../../../_common';
import ChartTile from './ChartTile.jsx';

export function ChartTilesContainer(props) {
  const {charts, activeFilters} = props;
  let filtered = [];
  if (charts) {
    filtered = charts.filter(chart => hasFilters(chart, activeFilters))
  }
  return (
    <div className='flex-row container'>
      {
        filtered.length > 0 
        ? filtered.map((chart, id) => {
            return <ChartTile key={id} chart={chart} />;
          })
        : <p className="center padding-sm">No charts with selected filters.</p>
      }
    </div>
  );
}

const mapState = (state) => {
  return {
    activeFilters: state.activeFilters,
  };
};

export default connect(mapState)(ChartTilesContainer);
