import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addActiveFilter, deleteActiveFilter } from '../../../store';

export class FilterButton extends Component {

  constructor(props) {
    super(props);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  // Event handler for Filter Button click event
  // Adds inactive button to active status and vice versa
  toggleFilter(evt) {

    const { activeFilters, addActiveFilter, deleteActiveFilter } = this.props;
    console.log('active filters', activeFilters );

    const cur_text = evt.target.innerText;
    const cur_isActive = activeFilters.indexOf(cur_text) !== -1;
    console.log('is active ', cur_isActive, ' classes are ', evt.target.className);

    if (!cur_isActive) { // not active element
      //add to activeFilters array
      addActiveFilter(cur_text);
    } else { // active element
      //remove from activeFilters array
      deleteActiveFilter(cur_text);
    }
  }

  render() {
    const {text, activeFilters} = this.props;
    return (
      <button type="button" onClick={this.toggleFilter} className={activeFilters.indexOf(text) !== -1 ? "btn btn-filter focus active" : "btn btn-filter"} data-toggle="button" aria-pressed="false" autoComplete="off">
        {text}
      </button>
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
    deleteActiveFilter: (filter) => { dispatch(deleteActiveFilter(filter)) }
  };
};

export default connect(mapState, mapDispatch)(FilterButton);