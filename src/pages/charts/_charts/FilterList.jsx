import React from 'react';

import { FilterButton } from '../../_common';

export default function FilterList(props) {
  const { filters, onClick } = props;
  console.log('rerender');
  return (
    <div className="bg-darker-blue padding-1">
      <h2>Filters</h2>
      <div className='flex-row container'>
        {
          filters && filters.map((cur, id) => {
            return (
              <FilterButton
                key={id} text={cur.text}
                onClick={(evt) => onClick(evt, id)}
                classes={cur.active ? "btn btn-filter focus active" : "btn btn-filter"}
              />
            );
          })
        }
      </div>
    </div>
  );
}