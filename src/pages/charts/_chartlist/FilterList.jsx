import React from 'react';
import { connect } from 'react-redux';

import { FilterButton } from '../../_common';

export function FilterList(props) {
  const { filters } = props;
  return (
    <div id="filters" className="bg-darker-blue padding-1">
      <h2>Filter Charts</h2>
      <div className='flex-row container'>
        {
          filters && filters.map((filterName, id) => {
            return (
              <FilterButton key={id} text={filterName} />
            );
          })
        }
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapState)(FilterList);