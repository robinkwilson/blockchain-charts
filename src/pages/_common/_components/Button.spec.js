import React from 'react';
import enzyme, { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import adapter from 'enzyme-adapter-react-16';
import TestUtils from 'react-dom/test-utils';


enzyme.configure({ adapter: new adapter() });

import Button from './Button.jsx';

describe('Button common component', () => {

  describe('props: txt and classes', () => {
    let wrapper;
    let defaultProps;
    beforeEach(() => {
      defaultProps = {
        classes: 'center padding-1',
        txt: 'button text',
      }
      wrapper = shallow(<Button txt={defaultProps.txt} classes={defaultProps.classes} />);
    });

    it('render button only', () => {
      expect(wrapper.find('button')).to.have.lengthOf(1);
    });
    it('txt as button text', () => {
      expect(wrapper.find('button').text()).to.be.equal('button text');
    });
    it('props classes are button classes', () => {
      expect(wrapper.find('button').hasClass('padding-1') && wrapper.find('button').hasClass('padding-1')).to.be.true;
    });

  });

  describe('props: linkto, txt, and classes', () => {

    let wrapper;
    let defaultProps;
    beforeEach(() => {
      defaultProps = {
        classes: 'center padding-1',
        txt: 'button text',
        linkto: 'page'
      }
      wrapper = shallow(<Button linkto={defaultProps.linkto} txt={defaultProps.txt} classes={defaultProps.classes} />);
    });

    it('render <a> with child <button>', () => {
      expect(wrapper.find('Link').children('button')).to.have.length(1);
    })
    xit('<a> with linkto as link', () => {
      // Testing Link references 
      // https://github.com/ReactTraining/react-router/blob/00c44b70ff0a06004df73b62acea837566c53256/modules/__tests__/Link-test.js#L41-L64
      // https://stackoverflow.com/questions/35317371/testing-href-value-from-a-link-component-while-having-dynamic-props
      // https://stackoverflow.com/questions/30332636/react-router-how-to-test-href-of-a-rendered-link
      
      TestUtils.renderIntoDocument(<Button linkto={defaultProps.linkto} txt={defaultProps.txt} classes={defaultProps.classes} />);
      let a = TestUtils.findRenderedDOMComponentWithTag(document, 'a');
      let domNode = a.getDOMNode();

      expect(domNode.getAttribute('href')).to.equal('/page');
    })
  });
});