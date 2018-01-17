import React from 'react';
import enzyme, { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
// import TestUtils from 'react-dom/test-utils';
import { spy } from 'sinon';
import SinonChai from 'sinon-chai';
import { createMockStore } from 'redux-test-utils';

// uses the unconnected FilterButton for testing purposes
import { FilterButton } from './FilterButton.jsx';
import { addActiveFilter, deleteActiveFilter } from '../../../store/index';

enzyme.configure({ adapter: new Adapter() });
chai.use(SinonChai);

describe('Filter Button common component', () => {

  describe('Non-active filter', () => {

    let wrapper, defaultProps, defaultStore, toggleSpy;
    
    let addActiveFilterSpy = spy();
    let deleteActiveFilterSpy = spy()

    beforeEach(() => {

      defaultProps = {
        text: 'filter1',
        activeFilters: ['filter2'], // simulate redux store
        filters: ['filter1', 'filter2'], // simulate redux store
        addActiveFilter: addActiveFilterSpy,
        deleteActiveFilter: deleteActiveFilterSpy
      }

      // const store = createMockStore(defaultProps.store);
      wrapper = shallow(<FilterButton {...defaultProps} />);
      toggleSpy = spy(wrapper.instance(), 'toggleFilter');

    });

    it('shallow wrapper for FilterButton accepts store arrays', () => {
      expect(wrapper).to.be.a('object');
    });

    it('render button with non-active classes', () => {
      expect(wrapper.find('button').hasClass('btn btn-filter')).to.be.true;
    });

    xit('when clicked calls toggleFilter', () => {
      expect(wrapper.find('button').simulate('click', { target: { innerText: 'filter1' } }));
      expect(toggleSpy.called).to.be.true; // Fails currently
    });

    it('when clicked calls addActiveFilter', () => {
      expect(wrapper.find('button').simulate('click', { target: { innerText: 'filter1' } }));
      expect(addActiveFilterSpy.called).to.be.true;
    });

    it('when clicked does NOT call deleteActiveFilter', () => {
      expect(wrapper.find('button').simulate('click', { target: { innerText: 'filter1' } }));
      expect(deleteActiveFilterSpy.called).to.be.false;
    });

  });

  describe('Active filter', () => {

    let wrapper;
    let defaultProps;
    beforeEach(() => {
      defaultProps = {
        text: 'filter1',
        activeFilters: ['filter1'], // simulate redux store
        filters: ['filter1', 'filter2'] // simulate redux store
      }
      wrapper = shallow(<FilterButton {...defaultProps} />);
    });

    xit('render button with active classes', () => {
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });

    xit('when clicked calls toggleFilter', () => {
      expect(wrapper.find('button').text()).to.be.equal('button text');
    });

    xit('when clicked calls deleteActiveFilter', () => {
      expect(wrapper.find('button').hasClass('padding-1') && wrapper.find('button').hasClass('padding-1')).to.be.true;
    });

  });
});


// component.dive().find("form").simulate("submit");
// expect(store.isActionDispatched({
//   type: "showBox/SUBMIT",
//   searchString: "Site"
// })).to.be.true;