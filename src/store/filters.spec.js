import enzyme, { shallow } from 'enzyme';
import chai, { expect } from 'chai';

import { ADD_ACTIVE_FILTER, DELETE_ACTIVE_FILTER } from './filters';
import { addActiveFilter, deleteActiveFilter } from './filters';

describe('Filter Redux Store', () => {
  describe('actions', () => {

    it('should create add active filter action', () => {
      
      const filterName = 'filter1';
      const expectedAction = {
        type: ADD_ACTIVE_FILTER,
        filterName
      };

      expect(addActiveFilter(filterName)).to.deep.equal(expectedAction)
    
    })

    it('should create delete active filter action', () => {
      
      const filterName = 'filter1';
      const expectedAction = {
        type: DELETE_ACTIVE_FILTER,
        filterName
      };

      expect(deleteActiveFilter(filterName)).to.deep.equal(expectedAction)
    
    })

    xit('should do nothing if filterName is not inside available filters', () => {
      // this functionality does not exist in the store
      // Manual Testing and QA: 
      //   Via chrome dev tools, I changed the button innertext to 'hello robin',
      //   the category charts filtered down to 'no available charts'. Works for me !
    })

  });
});