import React from 'react';
import enzyme, { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
// import TestUtils from 'react-dom/test-utils';
import { spy } from 'sinon';
import SinonChai from 'sinon-chai';
import { createMockStore } from 'redux-test-utils';

import FilterButton from './FilterButton.jsx';

enzyme.configure({ adapter: new Adapter() });
chai.use(SinonChai);

describe('Filter Button common component', () => {

  describe('Non-active filter', () => {
    let wrapper, defaultProps, defaultStore, toggleSpy;
    beforeEach(() => {
      defaultProps = {
        text: 'filter1',
      }
      defaultStore = {
        activeFilters: ['filter2'], // simulate redux store
        filters: ['filter1', 'filter2'] // simulate redux store
      }
      const store = createMockStore(defaultStore);
      toggleSpy = spy(FilterButton, 'toggleFilter');
      wrapper = shallow(<FilterButton {...defaultProps} />, store);
    });

    it('render button with non-active classes', () => {
      expect(wrapper.find('button').hasClass('btn btn-filter')).to.be.true;
    });
    it('when clicked calls toggleFilter', () => {
      expect(spy).toNotHaveBeenCalled()
      expect(wrapper.find('button').simulate('click'));
      expect(spy).toHaveBeenCalled();
    });
    xit('when clicked calls addActiveFilter', () => {
      expect(wrapper.find('button').hasClass('padding-1') && wrapper.find('button').hasClass('padding-1')).to.be.true;
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