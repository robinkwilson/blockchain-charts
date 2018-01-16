import React from 'react';

import { FilterButton } from '../../_common';

export function FilterList(props) {
  const { filters, activeFilters, onClick } = props;
  return (
    <div className="bg-darker-blue padding-1">
      <h2>Filters</h2>
      <div className='flex-row container'>
        {
          filters && filters.map((filterName, id) => {
            return (
              <FilterButton
                key={id} text={filterName}
                classes={ activeFilters.indexOf(filterName) !== -1 ? "btn btn-filter focus active" : "btn btn-filter"}
              />
            );
          })
        }
      </div>
    </div>
  );
}

const mapState = (state) => {
  const {activeFilters, filters} = state.filters;
  return {
    activeFilters,
    filters
  };
};

export default connect(mapState)(FilterList);