import React from 'react';

import { hasFilters } from '../../_common';

export function ChartTilesContainer(props) {
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
  };
};

export default connect(mapState)(ChartTilesContainer);
