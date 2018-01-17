import React from 'react';

import ChartTilesContainer from './ChartTilesContainer.jsx';

export default function CategoriesList(props) {
  const { categories, chartLists } = props;
  return (
    <div>
      {
        categories && categories.map((category, id) => {
          return (
            <div key={id} className="charts padding-1" >
              <h2>{`${categoryToTitle(category)}`}</h2>
              <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={`#${category}`} aria-expanded="false" aria-controls={category}>
                Collapse
              </button>
              <div id={category}>
                <ChartTilesContainer charts={chartLists[category].charts} />
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

// converts this.state.chartList property names into section titles
// ex: 'currency_statistics' => 'Currency Statistics'
function categoryToTitle(name) {
  return name.split('_').map(str => str[0].toUpperCase() + str.slice(1)).join(' '); //
}