import React from 'react'
import { shallow } from 'enzyme'
import AllTablesWidget from '../../app/bundles/POS/components/AllTablesWidget.jsx'
import MenuCategoriesWidget from '../../app/bundles/POS/components/MenuCategoriesWidget'
import sinon from 'sinon'

describe('AllTablesWidget', function () {
  const onClick = sinon.stub()
  const shouldRedirect = false;
  const tables = [{ id: 1, name: 'a' }, { id: 2, name: 'a' }];
  const props = { tables, onClick, shouldRedirect };
  const wrapper = shallow(<AllTablesWidget { ...props }/>);
  it('render the component', function () {
    expect(wrapper).to.have.lengthOf(1);
  });
});

describe('MenuCategoriesWidget', function () {
  const props = { menuCategories: [], onClick: sinon.stub() }
  const wrapper = shallow(<MenuCategoriesWidget {...props}/>);
  it('render the component', function () {
    expect(wrapper).to.have.lengthOf(1);
  });
});