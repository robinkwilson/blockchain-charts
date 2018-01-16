import React, { Component } from 'react';
import { connect } from 'react-redux';

export function CategoriesList(props) {
  const { categories, chartLists } = props;
  return (
    <section className="padding-1 charts">
      {
        categories && categories.map((category, id) => {
          return (
            <div>
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
    </section>
  );
}

export default CategoriesList;