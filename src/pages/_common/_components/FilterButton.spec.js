import React from 'react';
import enzyme, { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import SinonChai from 'sinon-chai';

// uses the unconnected FilterButton for testing purposes
import { FilterButton } from './FilterButton.jsx';

enzyme.configure({ adapter: new Adapter() });
chai.use(SinonChai);

describe('Filter Button common component', () => {

  describe('Non-active filter', () => {

    let wrapper, defaultProps, defaultStore, toggleSpy;

    let addActiveFilterSpy = spy();
    let deleteActiveFilterSpy = spy();

    beforeEach(() => {

      defaultProps = {
        text: 'filter1',
        activeFilters: ['filter2'], // simulate redux store
        filters: ['filter1', 'filter2'], // simulate redux store
        addActiveFilter: addActiveFilterSpy,
        deleteActiveFilter: deleteActiveFilterSpy
      }
      //toggleSpy = spy(FilterButton.prototype, 'toggleFilter');
      
      wrapper = shallow(<FilterButton {...defaultProps} />);
      toggleSpy = spy(wrapper.instance(), 'toggleFilter');
      
    });

    afterEach(() => {
      wrapper.instance().toggleFilter.restore();
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

    let wrapper, defaultProps, defaultStore, toggleSpy;

    let addActiveFilterSpy = spy();
    let deleteActiveFilterSpy = spy();

    beforeEach(() => {
      defaultProps = {
        text: 'filter1',
        activeFilters: ['filter1'], // simulate redux store
        filters: ['filter1', 'filter2'], // simulate redux store
        addActiveFilter: addActiveFilterSpy,
        deleteActiveFilter: deleteActiveFilterSpy
      }

      wrapper = shallow(<FilterButton {...defaultProps} />);

    });

    it('render button with active classes', () => {
      expect(wrapper.find('button').hasClass('focus active')).to.be.true;
    });

    it('when clicked calls deleteActiveFilter', () => {
      expect(wrapper.find('button').simulate('click', { target: { innerText: 'filter1' } }));
      expect(deleteActiveFilterSpy.called).to.be.true;
    });

  });
});


// component.dive().find("form").simulate("submit");
// expect(store.isActionDispatched({
//   type: "showBox/SUBMIT",
//   searchString: "Site"
// })).to.be.true;