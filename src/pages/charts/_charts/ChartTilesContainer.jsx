import React from 'react';

import { hasFilters } from '../../_common';

export default function ChartTilesContainer(props) {
  const {charts, activeFilters} = props;
  return (
    <div className='flex-row container'>
      {
        charts && charts
          .filter(chart => hasFilters(chart, activeFilters))
          .map((chart, id) => {
            return <ChartTile key={id} chart={chart} />;
          })
      }
    </div>
  );
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
