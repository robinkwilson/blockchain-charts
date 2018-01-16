import React, { Component } from 'react';
import { connect } from 'react-redux';

export class FilterButton extends Component {

  constructor (props) {
    super(props);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  // Event handler for Filter Button click event
  // Adds inactive button to active status and vice versa
  toggleFilter(evt) {
    console.log('button click event', evt);
    const { activeFilters, filters } = this.props;
    console.log('props filters', activeFilters, filters);

    const cur_text = evt.target.innerText;
    const cur_isActive = evt.target.className.indexOf('active') !== -1;

    if (!cur_isActive) { // not active element
      //add to activeFilters array
      this.props.addActiveFilter(cur_text);
    } else { // active element
      //remove from activeFilters array
      this.props.deleteActiveFilter(cur_text);
    }
  }

  render() {
    return (
      <button type="button" onClick={props.onClick} className={props.classes} data-toggle="button" aria-pressed="false" autoComplete="off">
        {props.text}
      </button>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addActiveFilter: (filter) => { dispatch(addActiveFilter(filter)) },
    deleteActiveFilter: (filter) => { dispatch(addActiveFilter(filter)) }
  };
};

export default connect(null, mapDispatch)(FilterButton);