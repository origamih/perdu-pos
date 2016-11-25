import { AllTables } from '../../app/bundles/POS/containers/AllTables';
import { MenuCategories } from '../../app/bundles/POS/containers/MenuCategories';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import jsdom from 'jsdom';

// setup document and window so that enzyme mount can run
global.document = jsdom.jsdom("hello world");
global.window = document.defaultView;

describe('AllTables', function () {
  const dispatch = sinon.stub();
  const mockProps = { tables: [], dispatch: dispatch }
  const wrapper = mount(<AllTables {...mockProps} />);
  it('render the components', function () {
    expect(wrapper).to.have.lengthOf(1);
  });
  it('call componentDidMount once', function() {
    expect(wrapper.props().dispatch.calledOnce).to.be.true;
  });
  it('render AllTablesWidget', function () {
    expect(wrapper.find('AllTablesWidget')).to.have.lengthOf(1);
  });
});

describe('MenuCategories', function () {
  const dispatch = sinon.stub();
  const mockProps = { menuCategories: [], dispatch: dispatch }
  const wrapper = mount(<MenuCategories {...mockProps}/>);
  it('render the components', function () {
    expect(wrapper).to.have.lengthOf(1);
  });
  it('call componentDidMount once', function() {
    expect(wrapper.props().dispatch.calledOnce).to.be.true;
  });
  it('render AllTablesWidget', function () {
    expect(wrapper.find('MenuCategoriesWidget')).to.have.lengthOf(1);
  });
});