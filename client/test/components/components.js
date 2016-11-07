import React from 'react'
import { shallow } from 'enzyme'
import AllTablesWidget from '../../app/bundles/POS/components/AllTablesWidget'
import MenuCategoriesWidget from '../../app/bundles/POS/components/MenuCategoriesWidget'
import sinon from 'sinon'

describe('AllTablesWidget', function () {
  const props = { tables : [{ id: 1, name: 'a' }, { id: 2, name: 'a' }] };
  const wrapper = shallow(<AllTablesWidget {...props}/>);
  it('render the component', function () {
    expect(wrapper).to.have.lengthOf(1);
  });
  it('render props properly', function () {
    expect(wrapper.find('Link').length).to.equal(2);
  });
});

describe('MenuCategoriesWidget', function () {
  const props = { menuCategories: [], onClick: sinon.stub() }
  const wrapper = shallow(<MenuCategoriesWidget {...props}/>);
  it('render the component', function () {
    expect(wrapper).to.have.lengthOf(1);
  });
});