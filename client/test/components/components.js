import React from 'react'
import { shallow } from 'enzyme'
import AllTablesWidget from '../../app/bundles/POS/components/AllTablesWidget'

const wrapper = shallow(<AllTablesWidget/>);

describe('AllTablesWidget', function () {
  it('render the component', function () {
    expect(wrapper).to.have.lengthOf(1);
  });
});